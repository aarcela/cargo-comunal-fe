import { CreatedShipment } from '../../../interfaces/shipment';




export interface ShipmentState {
    status: boolean;
    shipment: CreatedShipment | null;
};

type ShipmentAction = 
    | { type: 'created', payload: CreatedShipment }

    // generaEstado
export const ShipmentReducer = ( state: ShipmentState, action: ShipmentAction ): ShipmentState => {
    switch ( action.type ) {        
        case 'created':
            return {
                ...state,
                status: true,
                shipment: action.payload
            }
     
        default:
            return state;
    }
}