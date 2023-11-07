import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { MainRoutes } from './router';
import { GPSPermissionsContext } from './context/gps';
import { PermissionLocation } from './components/PermissionLocation';
import { PermissionNotification } from './components/PermissionNotification';
import { NotificationPermissionsContext } from './context/notifications';

import { Alert } from './components/Alert';

export const AppModule = () => {
  const { permissions, askLocationPermission, changeAttempt, checkGpsActive } = useContext( GPSPermissionsContext );
  const { permissionsNot, askNotificationPermission, changeAttemptN } = useContext( NotificationPermissionsContext )
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor="transparent" />
      <Alert 
        isVisible={permissions.gpsActive}
        isAnimated
        position='top'
        top={35}
        typeBg='warning'
        isTypeIcon='warning'
        children={'Para disfrutar de nuestro servicios de geolocalización, debe activar el GPS'}
        mh={15}
        delayAutomatic={8000}
        useStateOpacity={checkGpsActive}
      />
      <PermissionNotification 
        visible={permissionsNot.attempt}
        onCancel={() => changeAttemptN(false)}
        onAccept={() => askNotificationPermission() }
      />  

      <PermissionLocation 
        visible={permissions.attempt} 
        onCancel={() => changeAttempt(false)} 
        onAccept={() => askLocationPermission()}
      />
      <MainRoutes />
    </NavigationContainer>
  )
}
