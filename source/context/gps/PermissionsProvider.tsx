import React, { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { 
    check, 
    PERMISSIONS, 
    PermissionStatus, 
    openSettings
} from 'react-native-permissions';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { GPSPermissionsContext, GPSPersmissions } from './PermissionsContext';
import { Location } from '../../interfaces/location';


export const gpsPermissionInitState: GPSPersmissions = {
    avilitated: false,
    attempt: false
}


export const GPSPermissionsProvider = ({ children }: any ) => {
    const [gpsPermissions, setGpsPermissions] = useState( gpsPermissionInitState );
    const [gelocation, setGelocation] = useState<Location>();

    useEffect(() => {
        
        AppState.addEventListener('change', state => {
            
            if( state !== 'active' ) return;
           
            checkLocationPermission();
        });

    }, [])

    const checkLocationPermission = async() => {
        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios' ) {
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else {
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        console.log(permissionStatus, 'permision')
        if( permissionStatus == 'granted' ){
            const { err, geo } = await getCurrentLocation();
            console.log(geo, 'geo')
            if( geo ){
                const { coords: {latitude, longitude} } = geo;
                setGelocation({latitude, longitude});
            }
            
        }
        
        setGpsPermissions({
            ...gpsPermissions,
            avilitated: permissionStatus === 'granted',
            attempt: permissionStatus != 'granted' && !gpsPermissions.attempt ? true : false
        });
    }

    const askLocationPermission = async() => {
        openSettings();
        setGpsPermissions({
            ...gpsPermissions,
            attempt: false
        })
    }

    const changeAttempt = (val: boolean) => {
        setGpsPermissions({
            ...gpsPermissions,
            attempt: val
        })
    }

    const  getCurrentLocation = () : Promise<{geo?: GeolocationResponse, err?: GeolocationError}> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (success) => {
                    resolve({geo: success})
                },
                (err) => reject({err}),
            );
        })
    }

    return (
        <GPSPermissionsContext.Provider
            value={{
                permissions: gpsPermissions,
                geolocation: gelocation,
                checkLocationPermission,
                askLocationPermission,
                changeAttempt,
                
            }}
        >
            { children }
        </GPSPermissionsContext.Provider>
    );
}