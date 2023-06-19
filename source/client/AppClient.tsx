import React from 'react';

/**
 * Import State Global
*/
import { GPSPermissionsProvider } from '../context/gps';


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
    { children }
  </GPSPermissionsProvider>
);
