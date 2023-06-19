import React, { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { 
    check, 
    PERMISSIONS, 
    PermissionStatus, 
    openSettings
} from 'react-native-permissions';
import { GPSPermissionsContext, GPSPersmissions } from './PermissionsContext';


export const gpsPermissionInitState: GPSPersmissions = {
    avilitated: false,
    attempt: false
}


export const GPSPermissionsProvider = ({ children }: any ) => {
    const [gpsPermissions, setGpsPermissions] = useState( gpsPermissionInitState );

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

    return (
        <GPSPermissionsContext.Provider
            value={{
                permissions: gpsPermissions,
                checkLocationPermission,
                askLocationPermission,
                changeAttempt
            }}
        >
            { children }
        </GPSPermissionsContext.Provider>
    );
}