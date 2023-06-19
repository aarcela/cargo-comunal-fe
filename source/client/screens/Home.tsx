import React, { useContext } from 'react';
import { GPSPermissionsContext } from '../../context/gps';
import { Grid, Typography, PermissionLocation } from '../../components';

export const Home = () => {
  const { permissions, askLocationPermission, changeAttempt } = useContext( GPSPermissionsContext );
    
  return (
    <Grid container bgColor='zircon' flexDirection='column' justifyContent='center' spacing={2} >
      <PermissionLocation 
        visible={permissions.attempt} 
        onCancel={() => changeAttempt(false)} 
        onAccept={() => askLocationPermission()}
      />
      <Typography size='md' >Hola Inicio</Typography>
    </Grid>
  )
}
