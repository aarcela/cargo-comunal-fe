import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainRoutes } from './router';
import { GPSPermissionsContext } from './context/gps';
import { PermissionLocation } from './components/PermissionLocation';

export const AppModule = () => {
  const { permissions, askLocationPermission, changeAttempt } = useContext( GPSPermissionsContext );

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor="transparent" />
      <PermissionLocation 
        visible={permissions.attempt} 
        onCancel={() => changeAttempt(false)} 
        onAccept={() => askLocationPermission()}
      />
      <MainRoutes />
    </NavigationContainer>
  )
}
