import React, {useReducer, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AvailableShipping,
  CreateShipment,
  ShipmentContext,
} from './ShipmentContext';
import {ShipmentReducer, ShipmentState} from './ShipmentReducer';
import {Shipment} from '../../../interfaces';

const ShipmentInitState: ShipmentState = {
  status: false,
  shipment: null,
};

export const ShipmentProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(ShipmentReducer, ShipmentInitState);
  const [counter, setCounter] = useState(0);
  type Timer = ReturnType<typeof setTimeout>;

  const timerRef = useRef<Timer | null>(null);

  const startCounter = () => {
    if (counter < 10) {
      timerRef.current = setTimeout(() => {
        setCounter(prevCounter => prevCounter + 1);
        startCounter();
      }, 15000); // 15 segundos
    }
  };

  useEffect(() => {
    startCounter();

    // Limpia el temporizador al desmontar el componente
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const availableShipping: AvailableShipping = async () => {
    const shipment = await AsyncStorage.getItem('shipment-applicant');

    if (shipment == null) {
      return false;
    }

    const data = JSON.parse(shipment);
    dispatch({type: 'created', payload: data});

    return true;
  };

  const onCreateShipment: CreateShipment = async (shipment: Shipment) => {
    dispatch({type: 'created', payload: shipment});
    await AsyncStorage.setItem('shipment-applicant', JSON.stringify(shipment));

    return {
      ok: true,
      msg: 'Solicitud de viaje creada con éxito',
    };
  };

  const onDestrontyShipment = () => {
    dispatch({type: 'destroy'});
    AsyncStorage.removeItem('shipment-applicant');
  };

  return (
    <ShipmentContext.Provider
      value={{
        ...state,
        onCreateShipment,
        availableShipping,
        onDestrontyShipment,
        startCounter,
        counter,
      }}>
      {children}
    </ShipmentContext.Provider>
  );
};
