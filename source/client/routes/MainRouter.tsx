import React from 'react';
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
import { CreateShipment, Shipment } from '../screens/shipment';

const Stack = createStackNavigator();


export const MainRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName='NavBottomTab'
      screenOptions={{header: (props) => <ToolBar props={props} />}}
    >
      <Stack.Screen name="NavBottomTab" options={{headerShown: false}} component={NavBottomTab} />
      <Stack.Screen name="CreateShipment"  options={{headerShown: false}} component={CreateShipment} />
      <Stack.Screen name="Shipment" options={{headerShown: false}} component={Shipment} />
    </Stack.Navigator>
  )
}
