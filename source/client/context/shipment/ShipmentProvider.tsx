import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvailableShipping, CreateShipment, ShipmentContext } from "./ShipmentContext";
import { ShipmentReducer, ShipmentState } from './ShipmentReducer';
import { Shipment } from "../../../interfaces"


const ShipmentInitState: ShipmentState = {
    status: false,
    shipment: null
}

export const ShipmentProvider = ( { children }: any ) => {
    const [ state, dispatch ] = useReducer(ShipmentReducer, ShipmentInitState);

    
    const availableShipping: AvailableShipping = async() => {
        const shipment = await AsyncStorage.getItem('shipment-applicant');
        
        if( shipment == null  ){
            return false;
        }

        const data = JSON.parse(shipment);
        dispatch({ type: 'created', payload: data});

        return true;
    }


    const onCreateShipment: CreateShipment = async(shipment: Shipment) =>  {
        dispatch({ type: 'created', payload: shipment});
        await AsyncStorage.setItem('shipment-applicant', JSON.stringify(shipment));

        return {
            ok: true,
            msg: 'Solicitud de viaje creada con éxito'
        }
    };




    return (
        <ShipmentContext.Provider
            value={{
                ...state,
                onCreateShipment,
                availableShipping
            }}
        >
            { children }
        </ShipmentContext.Provider>
    )
}