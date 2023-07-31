import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, authReducer } from './AuthReducer';
import { LoginResponse, User } from '../../interfaces/user';
import { AuthContext } from './AuthContext';
import { FetchApi } from '../../utils/fetch';



const authInicialState: AuthState = {
    status: 'checking',
    user: null
}


export const AuthProvider = ( { children }: any ) => {
    const [ state, dispatch ] = useReducer(authReducer, authInicialState);

    useEffect(() => {
      checkToken();
    }, [])
    
    const checkToken = async() => {
  
        const verifyToken = await AsyncStorage.getItem('token');
        const verifyUser =  await AsyncStorage.getItem('user');
        
        // No token, no autenticado
        if ( verifyToken == null  || verifyUser == null) {
            dispatch({type: 'status', payload: 'not-authenticated'}); 
            return;
        };

        const user = JSON.parse(verifyUser);
    
        dispatch({ type: 'login', payload: user});

    }


    const signIn = async(email: string, password: string) => {
        const { ok, message, data }  = await FetchApi<LoginResponse>('post', '/login', {email, password});

        if(ok && data){
            setTimeout(async() => {
                dispatch({ type: 'login', payload: data!.user});
                await AsyncStorage.setItem('token', data!.access_token);
                await AsyncStorage.setItem('user', JSON.stringify(data!.user));
            }, 3000);

            return {
                ok
            };
        }

        

        return {
            ok,
            message
        }
    };

    const logout = async() => {
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};