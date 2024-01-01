import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * Import Components
 * ToolBar
 */

import {ToolBar} from '../../components/ToolBar';
import {Confirm} from '../screens';

/**
 * Import nav bottom tab
 */
import {NavBottomTab} from './NavBottomTab';

const Stack = createStackNavigator();

export const NavRouter = ({route}: any) => {
  return (
    <Stack.Navigator
      initialRouteName={'NavBottomTab'}
      screenOptions={{header: props => <ToolBar props={props} />}}>
      <Stack.Screen
        name="NavBottomTab"
        options={{headerShown: false}}
        component={NavBottomTab}
      />
      <Stack.Screen
        name="Confirm"
        options={{headerShown: false}}
        component={Confirm}
        initialParams={route && route.params ? route.params : undefined}
      />
    </Stack.Navigator>
  );
};
