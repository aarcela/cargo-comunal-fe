import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Grid,
  Map,
  Typography,
  CardDriver,
  CardTravelDetail,
  CardOrigin,
} from '../../components';
import {StackScreenProps} from '@react-navigation/stack';
import { FetchApi } from '../../utils';

export const Confirm = ({navigation, route}: StackScreenProps<any, any>) => {
  console.log('router info:', route.params);
  const goTravel = async() => {
    let ok: boolean = false
    let msg: string = ''
    let id_viaje: number 
    console.log('here!!', route.params)
  /*  try {
      const response = await FetchApi('patch', '/viajes', route.params);
      if (response.ok) {
        ok = true
        msg = response.data.message
        id_viaje = response.data.data[0].id
        console.log("on create shipment",response.data)
        
      } else {
        console.error("Error. Mensaje de error:", response.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } */

    await navigation.navigate('Travel');
  }
  return (
    <Grid flex={1} paddingLeft={5} paddingRight={5}>
      {/* Grid para mostrar la información en la parte superior */}
      <Grid
        position="absolute"
        width="100%"
        height="10%"
        zIndex={1024}
        paddingHorizontal={15}
        top={30}
        paddingVertical={10}>
        <CardTravelDetail
          fechaSalida={route.params?.notificationData.tiempo}
          tipoCarga={route.params?.notificationData.peso}
        />
      </Grid>

      {/* Mapa */}
      <Map
        region={{
          latitude: 10.48801,
          longitude: -66.87919,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Grid
        position="absolute"
        width="100%"
        height="12%"
        zIndex={1024}
        paddingHorizontal={15}
        bottom={230}
        right={0}>
        {/* Las dos primeras Typography para "Fecha de salida" y "Tipo de carga" */}
        <CardOrigin
          image={{source: require('../../assets/images/marker-origin-x2.png')}}
          origen={route.params?.notificationData.latitud_origen}
          destino={route.params?.notificationData.latitud_destino}
        />
      </Grid>
      {/* Grid para los botones de aceptar y rechazar */}
      <Grid
        position="absolute"
        width="100%"
        height="20%"
        zIndex={1024}
        paddingHorizontal={15}
        bottom={40}
        right={0}
        backgroundColor={'white'}>
        <Typography
          color="royalBlue"
          fontFamily="Poppins-Medium"
          size="md"
          styles={{
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 25,
            marginTop: 20,
          }}>
          Quieres Aceptar este viaje?
        </Typography>
        <View style={styles.container}>
          <Button
            typeStyle="btn-primary"
            size="sm"
            onPress={()=>goTravel()}
            activeOpacity={0.9}
            style={styles.button}>
            <Typography
              color="white"
              fontFamily="Poppins-Medium"
              size="md"
              styles={{
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 25,
              }}>
              Aceptar
            </Typography>
          </Button>
          <Button
            typeStyle="btn-primary"
            size="sm"
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.9}
            style={styles.button}>
            <Typography
              color="white"
              fontFamily="Poppins-Medium"
              size="md"
              styles={{
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 25,
              }}>
              Rechazar
            </Typography>
          </Button>
        </View>
      </Grid>
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', // Centra los elementos horizontalmente
    marginVertical: 20, // Espacio vertical entre los botones
  },
  button: {
    height: 50,
    marginHorizontal: 10, // Espacio horizontal entre los botones
  },
});
