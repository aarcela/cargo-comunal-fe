import React, { useContext } from 'react';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { RouteNavigation } from '../../interfaces/navigation';

// import toolbar, drawer y sidenav component

import { Drawer } from '../../components/navigation';
import { SideNav, ToolBar } from '../../components';



// import screns
import { MyProfile, MyTransport } from '../screens/profile';
import { AuthContext } from '../../context';

// import toolbar, drawer y sidenav component
const routes: RouteNavigation<DrawerNavigationOptions, any, any>[] = [
    {
      name: 'MyProfile',
      options:{
        title: 'Agregar transporte'
      },
      icon: {
        name: 'carOutline'
      },
      component: MyTransport
    },
    {
      name: 'EditProfile',
      options:{
        title: 'Ver perfil'
      },
      icon: {
        name: 'personOutline'
      },
      component: MyProfile
    }
  ]

export const NavDrawer = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Drawer 
      screenOptions={{
          header: (props) => <ToolBar props={props} showMenu={true} />,
      }}
      routes={routes}
      drawerContent={(props) => <SideNav drawerContent={props} routes={routes} onLogout={logout} showHrDivOnLogout />}
    />
  )
}
