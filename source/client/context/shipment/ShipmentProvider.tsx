import React, { useReducer, useEffect } from 'react';
import { ShipmentContext } from "./ShipmentContext";
import { ShipmentReducer, ShipmentState } from './ShipmentReducer';
import { Shipment } from "../../../interfaces"


const ShipmentInitState: ShipmentState = {
    status: false,
    shipment: null
}

export const ShipmentProvider = ( { children }: any ) => {
    const [ state, dispatch ] = useReducer(ShipmentReducer, ShipmentInitState);

    const onCreateShipment = async(shipment: Shipment) => {
        console.log(shipment, 'ss')
        //dispatch({ type: 'creating', payload: shipment})
    };




    return (
        <ShipmentContext.Provider
            value={{
                ...state,
                onCreateShipment,
            }}
        >
            { children }
        </ShipmentContext.Provider>
    )
}