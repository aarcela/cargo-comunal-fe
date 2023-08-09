import React from 'react'
import { FabIcon, Grid, Typography } from '../../components';
import { DrawerScreenProps } from '@react-navigation/drawer';

export const Home = ({ navigation }: DrawerScreenProps<any>) => {
  return (
    <Grid container bgColor='zircon' justifyContent='center' alignItems='center' spacing={2} >
        <Typography size='md' >Hola dashboard</Typography>
    </Grid>
  )
}
