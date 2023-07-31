import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteNavigation } from "../../interfaces/navigation";
import { BottomTab } from '../../components/navigation';
import { ToolBar } from '../../components/ToolBar';


// import screens
import { Home, Travel, Payment } from "../screens";

// nav Drawer
import { NavDrawer } from './NavDrawer';

const routes : RouteNavigation<BottomTabNavigationOptions, any, any>[] = [
  {
      name: 'Home',
      icon: {
          name: 'homeOutline'
      },
      options: {
          headerShown: false
      },
      component: Home
  },
  {
      name: 'Travel',
      icon: {
          name: 'compassOutline'
      },
      options: {
          title: 'Viajes'
      },
      component: Travel
  },
  {
    name: 'Payment',
    icon: {
        name: 'cardOutline'
    },
    options: {
        title: 'Pagos'
    },
    component: Travel
  },
  {
      name: 'Profile',
      options:{
          headerShown: false,
          title: 'Perfil'
      },
      icon:{
          name: 'personOutline'
      },
      component: NavDrawer
  }
];

export const NavBottomTab = () => {
  return (
    <BottomTab 
      initialRouteName='Home' 
      screenOptions={{
          header: (props) => <ToolBar props={props} />,
      }} 
      routes={routes} 
    />
  )
}
