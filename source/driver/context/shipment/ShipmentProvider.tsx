import React, { useReducer, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvailableShipping, CreateShipment, ShipmentContext } from './ShipmentContext';
import { ShipmentReducer, ShipmentState } from './ShipmentReducer';
import { Shipment } from '../../../interfaces';
import Geolocation from '@react-native-community/geolocation';

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
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Función para obtener la posición y actualizarla
    const fetchAndUpdateLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position.coords);
        },
        error => console.log('Error al obtener la posición: ', error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    // Iniciar el seguimiento cada 20 segundos
    const startTracking = () => {
      const intervalId = setInterval(fetchAndUpdateLocation, 20000);
      setTrackingInterval(intervalId);
    };

    // Iniciar el seguimiento al montar el componente
    startTracking();

    // Limpia el intervalo al desmontar el componente
    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
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
  );
};
