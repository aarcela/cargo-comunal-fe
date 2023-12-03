import React, { useContext } from 'react'
import { Grid, Map, Typography } from '../../components'
import { GPSPermissionsContext } from '../../context/gps';

export const Home = () => {

  const { geolocation, checkLocationPermission } = useContext( GPSPermissionsContext );
  
  return (
    <Grid container>
              <Map 
        region={{
          latitude: geolocation ? geolocation.latitude : 10.48801,
          longitude: geolocation ? geolocation.longitude : -66.87919,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </Grid>
  )
}
