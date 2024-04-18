import { createContext } from 'react';
import { Location } from '../../interfaces';
import { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';



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
    getCurrentLocation: () => Promise<{ geo?: GeolocationResponse; err?: GeolocationError }>; // Definir que getCurrentLocation devuelve una promesa
}

export const GPSPermissionsContext = createContext({} as GPSPermissionsContextProps ); 