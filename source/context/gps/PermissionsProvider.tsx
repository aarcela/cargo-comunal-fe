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
    attempt: false,
    gpsActive: false
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

        
        
        setGpsPermissions({
            ...gpsPermissions,
            avilitated: permissionStatus === 'granted',
            attempt: permissionStatus != 'granted' && !gpsPermissions.attempt ? true : false,
            gpsActive: false
        });


        if( permissionStatus == 'granted' ){
            getCurrentLocation()
            .then(location => {

                const { geo } = location;
                
                if( geo ){
                    const { coords: {latitude, longitude} } = geo;
                    setGelocation({latitude, longitude});
                }

            }).catch(error  => {
                const { err } = error
                if( err.message == 'No location provider available.'  ){
                    setGpsPermissions(values => ({...values, gpsActive: true}));
                }
            })
        }
    }

    const checkGpsActive = async() => {
       await checkLocationPermission();
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
                {
                    enableHighAccuracy: true
                }
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
                checkGpsActive
                
            }}
        >
            { children }
        </GPSPermissionsContext.Provider>
    );
}