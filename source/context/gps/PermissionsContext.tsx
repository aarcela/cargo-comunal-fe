import { createContext } from 'react';
import { GeolocationResponse } from '@react-native-community/geolocation';

export interface Location {
    latitude: number;
    longitude: number;
}

export interface GPSPersmissions{
    avilitated: boolean;
    attempt: boolean;
}

type GPSPermissionsContextProps = {
    permissions: GPSPersmissions;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
    changeAttempt: (val: boolean) => void;
    geolocation?: GeolocationResponse;
}

export const GPSPermissionsContext = createContext({} as GPSPermissionsContextProps ); 