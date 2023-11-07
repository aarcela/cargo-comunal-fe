import React, { useState, useMemo, useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabView, SceneRendererProps, Route } from 'react-native-tab-view';
import { ShipmentContext } from '../../context/shipment';
import {
  GenerateShipment,
  GenerateShipmentData,
  ConfirmShipment,
  OnCreateShipment,
  DataConfirmShipment
} from '../../components/createshipment';
import { 
  RouteShipment, 
  Shipment, 
  UbicationShipment, 
  WeightLoadShipment
} from '../../../interfaces/shipment';
import { userAplicant } from '../../../utils/testshipment';
import { AuthContext } from '../../../context';
import { FetchApi } from '../../../utils';
import { string } from 'yup';

interface createShipment {
  user_id: number | undefined;
  ruta: string | any;
  tiempo: string;
  hora: string;
  peso: string;
  latitud_origen: string;
  longitud_origen: string;
  latitud_destino: string;
  longitud_destino: string;
}

interface renderSceneProps extends SceneRendererProps{
  route: Route;
} 

export const CreateShipment = ({ navigation }: StackScreenProps<any, any>) => {
  const { id_user } = useContext(AuthContext)
  const { width } = useWindowDimensions();
  const { onCreateShipment } = useContext(ShipmentContext)

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first' },
    { key: 'second' },
  ]);

  const currentPosition = useMemo(() => index, [index]);

  // useState for creating shipment

  const [ubicationShipment, setUbicationShipment] = useState<UbicationShipment>();
  const [routeShipment, setRouteShipment] = useState<RouteShipment | null>(null);
  const [weightLoadShipment, setWeightLoadShipment] = useState<WeightLoadShipment>();

  const saveShipment: OnCreateShipment = async (data: DataConfirmShipment) => {
    let ok: boolean = false
    let msg: string = ''
    let id_viaje: number 
    const { tiempo, hora } = obtenerFechaYHoraActual();
    const shipment: Shipment = {
      ubication: ubicationShipment!,
      route: routeShipment!,
      weightLoad: weightLoadShipment!,
      applicant: userAplicant,
      driver: data.driver,
      methodPayment: data.methodPayment,
      total: data.total
    }

    const newShipment: createShipment = {
      user_id : id_user,
      ruta : shipment.route.name,
      tiempo : tiempo,
      hora: hora,
      peso: shipment.weightLoad.toString(),
      latitud_origen: shipment.ubication.origin.location.lat.toString(),
      longitud_origen: shipment.ubication.origin.location.lng.toString(),
      latitud_destino: shipment.ubication.destination.location.lat.toString(),
      longitud_destino: shipment.ubication.destination.location.lng.toString()
      
    }
    try {
      const response = await FetchApi('post', '/viajes', newShipment);
      if (response.ok) {
        ok = true
        msg = response.data.message
        id_viaje = response.data.data[0].id
        console.log("on create shipment",response.data)
        await navigation.navigate('WaitDriver', { id_viaje });
      } else {
        console.error("Error. Mensaje de error:", response.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    return {
      ok,
      msg
    }
  } 

  const obtenerFechaYHoraActual = () => {
    const ahora = new Date();
    // Formatear la fecha en el formato 'YYYY-MM-DD'
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');
    const fecha = `${year}-${month}-${day}`;
    // Formatear la hora en el formato 'HH:mm:ss'
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    const seconds = String(ahora.getSeconds()).padStart(2, '0');
    const hora = `${hours}:${minutes}:${seconds}`;
  
    return {
      tiempo: fecha,
      hora: hora,
    };
  };
  const renderScene = ({route, jumpTo}: renderSceneProps) => {
    switch (route.key) {
      case 'first':
        return <GenerateShipment 
          active={currentPosition === 0}
          goBack={navigation.goBack} 
          next={({ ubication, weightLoad, routeS }:GenerateShipmentData) => {
            setUbicationShipment(ubication);
            setWeightLoadShipment(weightLoad);
            setRouteShipment(routeS);
            
            jumpTo('second')
          }} 
        />
      case 'second':
        return <ConfirmShipment 
          active={currentPosition === 1}
          goBack={() => jumpTo('first')}
          origin={ ubicationShipment?.origin ? ubicationShipment.origin : undefined} 
          destination={ ubicationShipment?.destination ? ubicationShipment?.destination : undefined}
          onChangeUbication={(ubication) => setUbicationShipment(ubication)}
          createShipment={saveShipment}
        />
      default:
        return null;
    }
  };

  return (
    <TabView
      swipeEnabled={false}
      initialLayout={{ width: width  }}
      renderTabBar={() => null}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

