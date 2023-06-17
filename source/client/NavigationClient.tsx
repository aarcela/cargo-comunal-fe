import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


/**
 * Import Components
 * ToolBar
*/

import { ToolBar } from '../components/ToolBar';

/**
 * Import Routes 
*/
import { NavBottomTab } from './routes/NavBottomTab';

const Stack = createStackNavigator();


export const NavigationClient = () => {
  return (
    <Stack.Navigator
      initialRouteName='NavBottomTab'
      screenOptions={{header: (props) => <ToolBar props={props} />}}
    >
      <Stack.Screen name="NavBottomTab" options={{headerShown: false}} component={NavBottomTab} />
    </Stack.Navigator>
  )
}
