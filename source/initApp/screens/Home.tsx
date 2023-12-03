import React from 'react';
import {Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Grid, Button, Typography, Hr} from '../../components';

export const Home = ({navigation}: StackScreenProps<any, any>) => {
  return (
    <Grid
      container
      bgColor="zircon"
      flexDirection="column"
      justifyContent="center"
      spacing={2}>
      <Grid
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        height={150}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            maxWidth: 240,
            resizeMode: 'contain',
          }}
        />
      </Grid>
      <Typography
        fontFamily="Poppins-Regular"
        size="xl"
        color="rollingStone"
        styles={{textAlign: 'center'}}>
        CargoComunal
      </Typography>
      <Button
        typeStyle="btn-primary"
        size="sm"
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('Login')}>
        <Typography
          color="white"
          fontFamily="Poppins-Medium"
          size={16}
          styles={{
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 25,
          }}>
          Iniciar Sesión
        </Typography>
      </Button>
      <Grid
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center">
        <Hr width="30%" height={1.5} />
        <Typography
          fontFamily="Poppins-Regular"
          color="silver"
          size={'md'}
          styles={{width: '40%', textAlign: 'center', marginTop: 1}}>
          Ó
        </Typography>
        <Hr width="30%" height={1.5} />
      </Grid>
      <Button
        typeStyle="btn-light"
        borderWidth={1}
        size="sm"
        onPress={() => navigation.navigate('Register')}>
        <Typography
          color="rollingStone"
          fontFamily="Poppins-Light"
          size={16}
          styles={{
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 23,
          }}>
          Regístrate
        </Typography>
      </Button>
      <Grid
        display="flex"
        marginTop={40}
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        >
        <Grid
          height={100}
          width={'45%'}>
          <Image
            source={require('../../assets/images/fondemi.png')}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              resizeMode: 'contain',
            }}
          />
        </Grid>
        <Grid
          height={100}
          width={'45%'}>
          <Image
            source={require('../../assets/images/safonapp_logo.webp')}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              resizeMode: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
