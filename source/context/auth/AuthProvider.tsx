import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, authReducer } from './AuthReducer';
import { LoginResponse } from '../../interfaces/user';
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
        
        // No token, no autenticado
        if ( verifyToken ) return;
    
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logout'});  

    }


    const signIn = async(email: string, password: string) => {
        const { ok, message, data }  = await FetchApi<LoginResponse>('post', '/login', {data: {email, password}});

        if(!ok){
            return {
                ok,
                message
            };
        }

        dispatch({ type: 'login', payload: data!.user});
        await AsyncStorage.setItem('token', data!.access_token);

        return {
            ok
        }
    };

    const logout = async() => {
        await FetchApi('delete', '/logout');
        await AsyncStorage.removeItem('token');
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