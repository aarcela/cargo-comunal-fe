import { createContext } from 'react';
import { Location } from '../../interfaces';



export interface GPSPersmissions{
    avilitated: boolean;
    attempt: boolean;
    gpsActive: boolean;
}

type GPSPermissionsContextProps = {
    permissions: GPSPersmissions;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
    changeAttempt: (val: boolean) => void;
    geolocation?: Location;
    checkGpsActive: () => void;
}

export const GPSPermissionsContext = createContext({} as GPSPermissionsContextProps ); 