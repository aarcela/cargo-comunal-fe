import React from 'react';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { RouteNavigation } from '../../interfaces/navigation';

// import toolbar, drawer y sidenav component

import { Drawer } from '../../components/navigation';
import { SideNav, ToolBar } from '../../components';


// import screens
import { EditProfile, Wallet } from '../screens';


// import toolbar, drawer y sidenav component
const routes: RouteNavigation<DrawerNavigationOptions, any, any>[] = [
  {
    name: 'Wallet',
    icon: {
      name: 'walletOutline'
    },
    component: Wallet
  },
  {
    name: 'EditProfile',
    options:{
      title: 'Editar perfil'
    },
    icon: {
      name: 'personOutline'
    },
    component: EditProfile
  }
]

export const NavDrawer = () => {
  return (
    <Drawer 
      screenOptions={{
          header: (props) => <ToolBar props={props} showMenu={true} />,
      }}
      routes={routes}
      drawerContent={(props) => <SideNav drawerContent={props} routes={routes} onLogout={()=> null} showHrDivOnLogout />}
    />
  )
}
