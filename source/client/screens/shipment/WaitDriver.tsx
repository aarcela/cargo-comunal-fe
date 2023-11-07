import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FetchApi} from '../../../utils';

import {
  Grid,
  Typography,
  Button,
  LoadIndicatorModal,
} from '../../../components';

export const WaitDriver = ({navigation, route}: StackScreenProps<any, any>) => {
  const id_viaje = route.params?.id_viaje;
    const cancelShipment = async (id: number) => {
      console.log("id viaje",id)
    const response = await FetchApi('delete', '/viajes', id);
    console.log(response);
    if (response) {
      await navigation.navigate('Home');
    }
  };
  return (
    <Grid flex={1}>
      <Grid
        container
        bgColor="zircon"
        flexDirection="column"
        justifyContent="center"
        spacing={2}>
        <Typography
          color="abbey"
          fontFamily="Poppins-Medium"
          size="lg"
          styles={{
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 25,
          }}>
          Esperando conductor....
        </Typography>
      </Grid>
      <Grid
        position="absolute"
        width="100%"
        zIndex={1024}
        paddingHorizontal={15}
        bottom={40}
        right={0}>
        <Button
          typeStyle="btn-primary"
          size="sm"
          onPress={() => cancelShipment(id_viaje)}
          activeOpacity={0.9}>
          <Typography
            color="white"
            fontFamily="Poppins-Medium"
            size="md"
            styles={{
              textTransform: 'uppercase',
              textAlign: 'center',
              lineHeight: 25,
            }}>
            Cancelar transporte
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
