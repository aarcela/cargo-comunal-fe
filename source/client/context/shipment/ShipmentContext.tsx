import { createContext } from 'react';
import { CreatedShipment, Shipment } from '../../../interfaces/shipment';


export type StatusShipment = boolean;


type ShipmentContextProps = {
    status: StatusShipment;
    shipment: Shipment | null;
    onCreateShipment: (shipment: Shipment) => Promise<void>;
}

export const ShipmentContext = createContext({} as ShipmentContextProps);