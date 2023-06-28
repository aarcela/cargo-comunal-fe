import { createContext } from 'react';
import { CreatedShipment, Shipment } from '../../../interfaces/shipment';


export type StatusShipment = boolean;


type ShipmentContextProps = {
    status: StatusShipment;
    shipment?: Shipment;
    createShipment: (shipment: Shipment) => void;
    confirmShipment: () => void;
}

export const ShipmentContext = createContext({} as ShipmentContextProps);