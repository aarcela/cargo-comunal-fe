import React from 'react';
import { useWindowDimensions } from 'react-native';
import { 
  createDrawerNavigator, 
  DrawerNavigationOptions,
  DrawerContentComponentProps 
} from '@react-navigation/drawer';

import { RouteNavigation } from '../../interfaces/navigation';


const DrawerNav = createDrawerNavigator();

interface DrawerProps{
  initialRouteName?: string;
  screenOptions?: DrawerNavigationOptions;
  drawerContent?: (props: DrawerContentComponentProps) => React.ReactNode;
  routes: RouteNavigation<DrawerNavigationOptions>[];
}

export const Drawer = ({ initialRouteName, screenOptions, drawerContent, routes }: DrawerProps) => {
  const { width } = useWindowDimensions();

  return (
    <DrawerNav.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        ...screenOptions,
        drawerType: (width >= 768 ) ? 'permanent' : 'front',
        drawerStyle: {
            width: '100%'
        }
      }}
      drawerContent={drawerContent}
    >
      {
        routes.map(({name, component, options}, index) => (
            <DrawerNav.Screen key={index} name={name} options={options} component={component} />
        ))
      }
    </DrawerNav.Navigator>
  )
}
