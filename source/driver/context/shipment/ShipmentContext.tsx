import { createContext } from 'react';
import { CreatedShipment, Shipment } from '../../../interfaces/shipment';

export type CreateShipment = (shipment: Shipment) => Promise<{ok: boolean, msg?: string }>;
export type AvailableShipping = () => Promise<boolean>;


type ShipmentContextProps = {
    status: boolean;
    shipment: CreatedShipment | null;
    onCreateShipment: CreateShipment;
    onDestrontyShipment: () => void;
    availableShipping: AvailableShipping;
    counter: number; // Nueva propiedad contador
    startCounter: () => void; // Método para iniciar el contador
}

export const ShipmentContext = createContext({} as ShipmentContextProps);