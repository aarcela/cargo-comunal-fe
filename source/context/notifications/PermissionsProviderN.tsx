import React, {useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
  RESULTS,
} from 'react-native-permissions';
import { NotificationPermissionsContext, NotificationPermissions } from './PermissionsContextN';

export const NotificationPermissionsState: NotificationPermissions = {
  active: false,
  attempt: false,
  avilitated: false
}

export const NotificationPermissionsProvider = ({ children }: any) => {
  const [notificationPermissions, setNotificationPermissions] = useState(NotificationPermissionsState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkNotificationPermission();
    });
  }, []);

  const checkNotificationPermission = async () => {
    let permissionStatus: PermissionStatus;

    permissionStatus = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    console.log('STATUS PERMISOS NOT: ',permissionStatus)
    setNotificationPermissions({
      ...notificationPermissions,
      avilitated: permissionStatus === 'granted' || permissionStatus === 'unavailable',
      active: false,
      attempt: permissionStatus !== 'granted' && !notificationPermissions.attempt ? true : false,
    });
    return permissionStatus
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    const permissionStatus = await request(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    );

    setNotificationPermissions({
      ...notificationPermissions,
      active: permissionStatus === 'granted',
      attempt: true,
      avilitated: permissionStatus === 'granted',
    });

    return permissionStatus === 'granted'; // Devuelve true o false
  };

  const resetNotificationPermissionAttempt = () => {
    setNotificationPermissions({
      ...notificationPermissions,
      attempt: false,
    });
  };

  const changeAttemptN = (val: boolean) => {
    setNotificationPermissions({
      ...notificationPermissions,
      attempt: val,
    });
  };


  const checkNotificationActive = async() => {
    await checkNotificationPermission();
 }

  const askNotificationPermission = async () => {
    openSettings();
    setNotificationPermissions({
      ...notificationPermissions,
      attempt: false,
    });
  };

  return (
    <NotificationPermissionsContext.Provider
      value={{
        permissionsNot: notificationPermissions,
        requestNotificationPermission,
        resetNotificationPermissionAttempt,
        changeAttemptN,
        askNotificationPermission,
      }}
    >
      {children}
    </NotificationPermissionsContext.Provider>
  );
};

