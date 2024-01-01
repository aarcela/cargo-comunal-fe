import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavRouter } from './routes/NavRouter';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const AppDriver = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Manejar la notificación push
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(({ data }) => {
      // Redirigir a la pantalla "Confirm" y pasar los datos de la notificación
      navigation.navigate('Confirm');
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      // Utiliza el objeto de navegación desde el contexto para navegar a la pantalla Confirm
      navigation.navigate('Confirm', { notificationData: remoteMessage.data });
    });
  
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        // También puedes redirigir desde aquí si la aplicación se abre desde un estado cerrado
        navigation.navigate('Confirm', { notificationData: remoteMessage.data });
      }
    });
  
    messaging().onMessage(async remoteMessage => {
      // Puedes hacer algo similar cuando la aplicación está en primer plano
      navigation.navigate('Confirm', { notificationData: remoteMessage.data });
    });
    return unsubscribe;
  }, [navigation]);

  return <NavRouter />;
};
