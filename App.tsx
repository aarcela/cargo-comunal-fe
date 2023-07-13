import 'react-native-gesture-handler';
import React  from 'react';
import { AuthProvider, GPSPermissionsProvider } from './source/context';
import { AppModule } from './source/AppModule';


export const App = () => {

  return (
    <AppState>
      <AppModule />
    </AppState>
  )
}


const AppState = ( {children}: any ) => {
 
  return (
    <AuthProvider>
      <GPSPermissionsProvider>
      { children }
      </GPSPermissionsProvider>
    </AuthProvider>
  );
}