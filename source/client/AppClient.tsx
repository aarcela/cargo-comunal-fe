import React from 'react';

/**
 * Import State Global
*/
import { GPSPermissionsProvider } from '../context/gps';
import { ShipmentProvider } from './context/shipment';


/**
 * Import routes client
*/
import { MainRouter  } from './routes/MainRouter';


export const AppClient = () => {
  return (
    <AppState>
      <MainRouter  />
    </AppState>
  )
}


const AppState = ({ children }: any) =>(
  <GPSPermissionsProvider>
    <ShipmentProvider>
    { children }
    </ShipmentProvider>
  </GPSPermissionsProvider>
);
