import React, { createContext } from 'react';
import { CreatedShipment, Shipment } from '../../../interfaces/shipment';

export type CreateShipment = (shipment: Shipment) => Promise<{ ok: boolean; msg?: string }>;
export type AvailableShipping = () => Promise<boolean>;

// Definición de GeolocationCoordinates
interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

type ShipmentContextProps = {
  status: boolean;
  shipment: CreatedShipment | null;
  onCreateShipment: CreateShipment;
  onDestrontyShipment: () => void;
  availableShipping: AvailableShipping;
  counter: number; // Nueva propiedad contador
  startCounter: () => void; // Método para iniciar el contador
  location: GeolocationCoordinates | null; // Nueva propiedad ubicación
  startTracking: () => void; // Método para iniciar el seguimiento
};

export const ShipmentContext = createContext<ShipmentContextProps>({
  status: false,
  shipment: null,
  onCreateShipment: (shipment: Shipment) => Promise.resolve({ ok: true }),
  onDestrontyShipment: () => {},
  availableShipping: async () => false,
  counter: 0,
  startCounter: () => {},
  location: null,
  startTracking: () => {}, // Inicializamos startTracking como una función vacía
} as ShipmentContextProps); // Aquí se proporciona explícitamente el tipo ShipmentContextProps
