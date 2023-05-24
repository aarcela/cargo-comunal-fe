import React from 'react';
import { Grid, Button, Typography, Hr } from '../components';
import { Image } from 'react-native';

export const Home = () => {
  return (
    <Grid container bgColor='zircon' flexDirection='column' justifyContent='center' spacing={2}>
        <Grid display='flex' position='relative' alignItems='center' justifyContent='center' height={150}>
          <Image 
            source={require('../assets/images/icon-truck.png')}
            style={{
              maxWidth: 240,
              resizeMode: 'contain',
            }}
          />
        </Grid>
        <Typography fontFamily='Poppins-Regular' size='md' color='abbey' styles={{textAlign: 'center'}}>
          Consigue un viaje en unos minutos ó comienza a conducir con nosotros.
        </Typography>
        <Button
          typeStyle='btn-primary'
          size='sm'
          style={{marginTop: 30}}
        >
          <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
            Iniciar Sesión
          </Typography>
        </Button>
        <Grid display='flex' marginVertical={5} flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
          <Hr width='30%' height={1.5} />
          <Typography fontFamily='Poppins-Regular' color='silver' size={'md'} styles={{width: '40%', textAlign: 'center', marginTop: 1}}>
            Ó
          </Typography>
          <Hr width='30%' height={1.5} /> 
        </Grid>
        <Button
          typeStyle='btn-light'
          borderWidth={1}
          size='sm'
        >
          <Typography color='rollingStone' fontFamily='Poppins-Light' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 23}}>
            Regístrate
          </Typography>
        </Button>
        <Grid display='flex' marginTop={30} flexDirection='row' width='100%' justifyContent='space-between' alignItems='center'>
          <Grid display='flex' position='relative' alignItems='center' justifyContent='center' height={45} width={'45%'}>
            <Image 
              source={require('../assets/images/fondemi.png')}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                resizeMode: 'contain',
              }}
            />
          </Grid>
          <Grid display='flex' position='relative' alignItems='center' justifyContent='center' height={45} width={'45%'}>
            <Image 
              source={require('../assets/images/safonapp.png')}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                resizeMode: 'contain',
              }}
            />
          </Grid>
        </Grid>
    </Grid>
  )
}
