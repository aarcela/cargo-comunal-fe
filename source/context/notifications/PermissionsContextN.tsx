import {createContext} from 'react';

// Definir una interfaz para los estados de los permisos de notificaciones
export interface NotificationPermissions {
  active: boolean;
  attempt: boolean;
  avilitated: boolean
}

// Definir el contexto y sus funciones
type NotificationPermissionsContextProps = {
  permissionsNot: NotificationPermissions;
  requestNotificationPermission: () => Promise<boolean>;
  resetNotificationPermissionAttempt: () => void;
  changeAttemptN: (val: boolean) => void;
  askNotificationPermission: () => void;
};

export const NotificationPermissionsContext = createContext(
  {} as NotificationPermissionsContextProps,
);
