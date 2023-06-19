import { createContext } from 'react';

export interface GPSPersmissions{
    avilitated: boolean;
    attempt: boolean;
}

type GPSPermissionsContextProps = {
    permissions: GPSPersmissions;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
    changeAttempt: (val: boolean) => void;
}

export const GPSPermissionsContext = createContext({} as GPSPermissionsContextProps ); 