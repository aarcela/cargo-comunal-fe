import React, { useReducer, useEffect, useRef, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvailableShipping, CreateShipment, ShipmentContext } from './ShipmentContext';
import { ShipmentReducer, ShipmentState } from './ShipmentReducer';
import { Shipment } from '../../../interfaces';
import Geolocation from '@react-native-community/geolocation';
import { GPSPermissionsProvider }  from '../../../context/gps/PermissionsProvider';
import { GPSPermissionsContext } from '../../../context';

// Definición de GeolocationCoordinates si no está definida ya
interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

const ShipmentInitState: ShipmentState = {
  status: false,
  shipment: null,
};

export const ShipmentProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(ShipmentReducer, ShipmentInitState);
  const [location, setLocation] = useState<any>(null);
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null);
  const [counter, setCounter] = useState(0);
  const { permissions, getCurrentLocation } = useContext(GPSPermissionsContext)
   // Método para iniciar el seguimiento
   const startTracking = () => {
    // Función para obtener la posición y actualizarla
    const fetchAndUpdateLocation = () => {
      getCurrentLocation() 
        .then((location : any) => {
          const { geo } = location;
          if (geo) {
            const { coords: { latitude, longitude } } = geo;
            setLocation({ latitude, longitude });
            console.log("here?",location)
          }
        })
        .catch(error => {
          console.log('Error al obtener la posición: ', error);
        });
    };

    // Iniciar el seguimiento cada 20 segundos
    const intervalId = setInterval(fetchAndUpdateLocation, 60000);
    setTrackingInterval(intervalId);

    // Limpia el intervalo al desmontar el componente
    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  };
  useEffect(() => {
    startTracking();
  }, []);

  // Método para iniciar el contador
  const startCounter = () => {
    // Implementa tu lógica de contador aquí si es necesario
  };
  //crear metodo startTraking
  const availableShipping: AvailableShipping = async () => {
    const shipment = await AsyncStorage.getItem('shipment-applicant');

    if (shipment == null) {
      return false;
    }

    const data = JSON.parse(shipment);
    dispatch({ type: 'created', payload: data });

    return true;
  };

  const onCreateShipment: CreateShipment = async (shipment: Shipment) => {
    dispatch({ type: 'created', payload: shipment });
    await AsyncStorage.setItem('shipment-applicant', JSON.stringify(shipment));

    return {
      ok: true,
      msg: 'Solicitud de viaje creada con éxito',
    };
  };

  const onDestrontyShipment = () => {
    dispatch({ type: 'destroy' });
    AsyncStorage.removeItem('shipment-applicant');
  };

  return (
    <GPSPermissionsProvider>
        <ShipmentContext.Provider
        value={{
          ...state,
          onCreateShipment,
          availableShipping,
          onDestrontyShipment,
          location,
          counter,
          startCounter,
          startTracking
        }}>
        {children}
      </ShipmentContext.Provider>
    </GPSPermissionsProvider>
    
  );
};
