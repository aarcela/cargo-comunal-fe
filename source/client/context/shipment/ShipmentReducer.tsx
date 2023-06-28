import { CreatedShipment, Shipment } from '../../../interfaces/shipment/index';
import { StatusShipment } from './ShipmentContext';


type StateShipment<Bstate = true> = Bstate extends true ? {
    status: true;
    shipment: CreatedShipment;
} : {
    status: false,
    shipment: Shipment | null
}

export interface ShipmentState {
    status: StatusShipment;
    shipment?: Shipment;
};

type ShipmentAction = 
    | { type: 'creating', payload: Shipment }
    | { type: 'save',  payload: Shipment }

    // generaEstado
export const ShipmentReducer = ( state: ShipmentState, action: ShipmentAction ): ShipmentState => {
    switch ( action.type ) {        
        case 'creating':
            return {
                ...state,
                shipment: action.payload
            }

        case 'save':
            return {
                ...state,
                status: true,
                shipment: action.payload
            }

        default:
            return state;
    }
}