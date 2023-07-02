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



interface renderSceneProps extends SceneRendererProps{
  route: Route;
} 



export const CreateShipment = ({ navigation }: StackScreenProps<any, any>) => {
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

  const saveShipment: OnCreateShipment = async(data: DataConfirmShipment) => {
    const shipment: Shipment = {
      ubication: ubicationShipment!,
      route: routeShipment!,
      weightLoad: weightLoadShipment!,
      applicant: userAplicant,
      driver: data.driver,
      methodPayment: data.methodPayment,
      total: data.total
    }

    const { ok, msg  } = await onCreateShipment(shipment);

    if( ok ){
      setTimeout(() => {
        navigation.navigate('Shipment')
      }, 3000);
    }

    return {
      ok,
      msg
    }
  } 


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

