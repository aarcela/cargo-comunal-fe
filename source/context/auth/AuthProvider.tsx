import React, {useReducer, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState, authReducer} from './AuthReducer';
import {LoginResponse, User, UserFCM} from '../../interfaces/user';
import {AuthContext} from './AuthContext';
import {FetchApi} from '../../utils/fetch';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

const authInicialState: AuthState = {
  status: 'checking',
  user: null,
};

export const AuthProvider = ({children}: any) => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const [state, dispatch] = useReducer(authReducer, authInicialState);
  const [FCM, setFCM] = useState<string>()
  const [id_user, setIdUser] = useState<number>();

  useEffect(() => {
      checkToken();
      requestUserPermission();
      notificationsListener();
  }, []);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      return fcmToken;
    }
  };

  const notificationsListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      
      messaging().onMessage(async remoteMessage => {
        console.log("notification balblababla",remoteMessage)
    })  
  };
  const checkToken = async () => {
    const fcmToken = await getToken();
    setFCM(fcmToken)
    //console.log('geet fcm::', FMC);
    const verifyToken = await AsyncStorage.getItem('token');
    const verifyUser = await AsyncStorage.getItem('user');
    // No token, no autenticado
    if (verifyToken == null || verifyUser == null) {
      dispatch({type: 'status', payload: 'not-authenticated'});
      return;
    }

    const user = JSON.parse(verifyUser);

    dispatch({type: 'login', payload: user});
  };

  const signIn = async (email: string, password: string) => {
    const {ok, message, data} = await FetchApi<LoginResponse>(
      'post',
      '/login',
      {email, password},
    );
    let id_user: number = 0;  

    if (ok && data) {
      const user = data.data;
      id_user = parseInt(user.id)
      setIdUser(id_user)
      //const user_device_key: string | undefined = FCM
      if (data.data.token) {
        await AsyncStorage.setItem('token', data.data.token);
      }

      if (user) {
        dispatch({type: 'login', payload: user});
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
      return {
        ok,
        id_user
      };
    }

    return {
      ok,
      message,
      id_user
    };
  };

  const saveTokenFCM = async (user_id: number, user_device_key: string | undefined) => {
    const {ok, message} = await FetchApi<UserFCM>(
      'post',
      '/devices/updateKey',
      {user_id, user_device_key},
    );

    console.log("on save::", ok)
    return {
         status: ok
      }
  }
  const logout = async () => {
    await FetchApi('delete', '/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch({type: 'logout'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logout,
        saveTokenFCM,
        FCM,
        id_user
      }}>
      {children}
    </AuthContext.Provider>
  );
};
