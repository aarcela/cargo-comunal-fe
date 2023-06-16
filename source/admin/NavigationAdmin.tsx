import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import toolbar y drawer component

import { ToolBar } from '../components/ToolBar';
import { Drawer as SideNav, RouteProps } from '../components/Drawer';


/**
 * Imports Screens Admin 
*/
import { 
    EditProfile,
    Home,
    Petitions,
    Reports,
    Transports,
    Users
} from './screens';


/**
 * Definition of paths
 * the property index, is fundamental, since it determines the order of Drawer.Screen.
 * That is to say, if the Drawer.Screen is Home, then its index would be 0.
*/

const routes: RouteProps[] = [
    {
        index: 0,
        name: 'Home',
        label:{
            title: 'Dashboard'
        },
        icon: {
            name: 'homeOutline'
        }
    },
    {
        index: 1,
        name: 'Transports',
        label:{
            title: 'Transportes'
        },
        icon: {
            name: 'carOutline'
        }
    },
    {
        index: 2,
        name: 'Petitions',
        label:{
            title: 'Peticiones'
        },
        icon: {
            name: 'navigateCircleOutline'
        }
    },
    {
        index: 3,
        name: 'Reports',
        label:{
            title: 'Reportes'
        },
        icon: {
            name: 'readerOutline'
        }
    },
    {
        index: 4,
        name: 'Users',
        label:{
            title: 'Usuarios'
        },
        icon: {
            name: 'peopleOutline'
        }
    },
    {
        index: 5,
        name: 'EditProfile',
        label:{
            title: 'Mi perfil'
        },
        icon: {
            name: 'personOutline'
        }
    }
]


/**
 * DrawerNavigation component function
*/

const Drawer = createDrawerNavigator();

export const NavigationAdmin = () => {
    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator
            screenOptions={{
                header: (props) => <ToolBar props={props} showMenu={true} />,
                drawerType: (width >= 768 ) ? 'permanent' : 'front',
                drawerStyle: {
                    width: '100%'
                }
            }}
            drawerContent={(props) => <SideNav drawerContent={props} routes={routes} splitSection showSection={1} />}
        >
        <Drawer.Screen 
            name="Home"  
            options={{
                title: 'Dashboard'
            }} 

            component={Home} 
        />
        <Drawer.Screen 
            name="Transports"  
            options={{
                title: 'Transportes'
            }} 

            component={Transports} 
        />
        <Drawer.Screen 
            name="Petitions"  
            options={{
                title: 'Peticiones'
            }} 

            component={Petitions} 
        />
        <Drawer.Screen 
            name="Reports"  
            options={{
                title: 'Reportes'
            }} 

            component={Reports} 
        />
        <Drawer.Screen 
            name="Users"  
            options={{
                title: 'Usuarios'
            }} 

            component={Users} 
        />
         <Drawer.Screen 
            name="EditProfile"  
            options={{
                title: 'Editar Perfil'
            }} 

            component={EditProfile} 
        />
    </Drawer.Navigator>
  )
}
