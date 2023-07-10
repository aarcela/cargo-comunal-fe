import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainRoutes } from './source/router';
import { AuthProvider } from './source/context';


export const App = () => {

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor="transparent" />
      <AppState>
        <MainRoutes />
      </AppState>
    </NavigationContainer>
  )
}


const AppState = ( {children}: any ) => {
  return (
    <AuthProvider>
        { children }
    </AuthProvider>
  );
}