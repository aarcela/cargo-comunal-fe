import { CreatedShipment } from '../../../interfaces/shipment';




export interface ShipmentState {
    status: boolean;
    shipment: CreatedShipment | null;
};

type ShipmentAction = 
    | { type: 'created', payload: CreatedShipment }
    | { type: 'destroy' }

    // generaEstado
export const ShipmentReducer = ( state: ShipmentState, action: ShipmentAction ): ShipmentState => {
    switch ( action.type ) {        
        case 'created':
            return {
                ...state,
                status: true,
                shipment: action.payload
            }
        case 'destroy':
            return {
                ...state,
                status: false,
                shipment: null
            }
        default:
            return state;
    }
}