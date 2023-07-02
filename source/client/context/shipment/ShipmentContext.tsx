import { createContext } from 'react';
import { CreatedShipment, Shipment } from '../../../interfaces/shipment';

export type CreateShipment = (shipment: Shipment) => Promise<{ok: boolean, msg?: string }>;
export type AvailableShipping = () => Promise<boolean>;


type ShipmentContextProps = {
    status: boolean;
    shipment: CreatedShipment | null;
    onCreateShipment: CreateShipment;
    availableShipping: AvailableShipping;
}

export const ShipmentContext = createContext({} as ShipmentContextProps);