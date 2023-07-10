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
        const user: User = {
            email: 'solicitante@email.com', 
            password: '123456',
            fecha_nc: '09-04-1998',
            first_name: 'Test Name',
            first_surname: 'Test Surname',
            id_user: '1',
            phone: '+584125153163',
            ci: '7348735',
            username: 'test',
            role: 'solicitante'

        }
        
        dispatch({ type: 'login', payload: user});
        AsyncStorage.setItem('token', '0123456789');
        /*const verifyToken = await AsyncStorage.getItem('token');
        
        // No token, no autenticado
        if ( verifyToken ) return;
    
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logout'});  */

    }

    const testSignIn = (user: User) => {
        dispatch({ type: 'checking'});

        setTimeout(() => {
            dispatch({ type: 'login', payload: user});
            AsyncStorage.setItem('token', '0123456789');
        }, 1000);
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
                testSignIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};