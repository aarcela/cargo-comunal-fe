import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import toolbar, drawer y sidenav component

import { ToolBar } from '../components/ToolBar';
import { SideNav } from '../components/SideNav';
import { Drawer } from '../components/navigation';


// import routes
import { routes } from './routes.admin';


// Create user screen
import { CreateUser } from './screens/CreateUser';
import { AuthContext } from '../context';

const NavDrawer = () => {
    const { logout } = useContext(AuthContext)
    return (
        <Drawer 
            screenOptions={{
                header: (props) => <ToolBar props={props} showMenu={true} />,
                headerShown: true
            }}
            routes={routes}
            drawerContent={(props) => <SideNav onLogout={logout} drawerContent={props} routes={routes} splitSection showSection={1} />}
        />
    )
}

const Stack = createStackNavigator();

export const NavigationAdmin = () => {

    return (
        <Stack.Navigator
            initialRouteName='NavDrawer'
            screenOptions={{header: (props) => <ToolBar props={props} />}}
        >
            <Stack.Screen name="NavDrawer" options={{headerShown: false}} component={NavDrawer} />
            <Stack.Screen name="CreateUser" options={{title: 'Crear usuario'}} component={CreateUser} />
        </Stack.Navigator>
    )
}
