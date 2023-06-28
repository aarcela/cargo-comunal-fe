import React, { useReducer, useEffect } from 'react';
import { ShipmentContext } from "./ShipmentContext";
import { ShipmentReducer, ShipmentState } from './ShipmentReducer';
import { Shipment } from "../../../interfaces"


const ShipmentInitState: ShipmentState = {
    status: false,
}

export const ShipmentsProvider = ( { children }: any ) => {
    const [ state, dispatch ] = useReducer(ShipmentReducer, ShipmentInitState);

    const createShipment = (shipment: Shipment) => {
            
    }

    const confirmShipment = () => {
        
    }


    return (
        <ShipmentContext.Provider
            value={{
                ...state,
                createShipment,
                confirmShipment
            }}
        >
            { children }
        </ShipmentContext.Provider>
    )
}