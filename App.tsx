import 'react-native-gesture-handler';
import React  from 'react';
import { AuthProvider, GPSPermissionsProvider, NotificationPermissionsProvider } from './source/context';
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
        <NotificationPermissionsProvider>
        { children }
        </NotificationPermissionsProvider>
      </GPSPermissionsProvider>
    </AuthProvider>
  );
}