import React from 'react';
import { RouteNavigation } from "../../interfaces/navigation";
import { Home, Travel } from "../screens";
import { BottomTab } from '../../components/navigation';
import { ToolBar } from '../../components/ToolBar';

export const routes : RouteNavigation[] = [
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
