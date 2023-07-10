import React, { useEffect, useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';


/**
 * Import Components
 * ToolBar
*/

import { ToolBar } from '../../components/ToolBar';

/**
 * Import nav bottom tab
*/
import { NavBottomTab } from './NavBottomTab';

/**
 * Imports screns stack 
 * 
*/
import { CreateShipment, Shipment, Invoice } from '../screens/shipment';

/**
 * Import state global shipment 
*/
import { ShipmentContext } from '../context/shipment';
import { LoadIndicatorModal } from '../../components';

const Stack = createStackNavigator();

type InitScreendMainRouter = 'NavBottomTab' | 'CreateShipment' | 'Shipment';

export const MainRouter = () => {
  const [init, setInit] = useState<InitScreendMainRouter>('NavBottomTab');
  const [loading, setLoading] = useState(true);
  const { availableShipping } = useContext(ShipmentContext);
  
  useEffect(() => {
    checkShipment();
  }, []);

  const checkShipment = async() => {
    const shipment = await availableShipping();

    if( shipment ){
      setInit('Shipment');
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
  

  if( loading ){
    return <LoadIndicatorModal 
      visible={loading}
      bgColorModal='white'
      isText={false}
      loadIndicatorProps={{
        color: "#3292E1"
      }}
    />
  }

  return (
    <Stack.Navigator
      initialRouteName={init}
      screenOptions={{header: (props) => <ToolBar props={props} />}}
    >
      <Stack.Screen name="NavBottomTab" options={{headerShown: false}} component={NavBottomTab} />
      <Stack.Screen name="CreateShipment"  options={{headerShown: false}} component={CreateShipment} />
      <Stack.Screen name="Shipment" options={{headerShown: false}} component={Shipment} />
      <Stack.Screen name="InvoiceShipment" options={{headerShown: false}} component={Invoice} />
    </Stack.Navigator>
  )
}
