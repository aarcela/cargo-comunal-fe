import React, { useState, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabView, SceneRendererProps, Route } from 'react-native-tab-view';
import {
  GenerateShipment,
  GenerateShipmentData,
  ConfirmShipment
} from '../../components/createshipment';
import { 
  RouteShipment, 
  UbicationShipment, 
  WeightLoadShipment
} from '../../../interfaces/shipment';


interface renderSceneProps extends SceneRendererProps{
  route: Route;
} 



export const CreateShipment = ({ navigation }: StackScreenProps<any, any>) => {
  const { width } = useWindowDimensions();
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

