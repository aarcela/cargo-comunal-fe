import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import toolbar y drawer component

import { ToolBar } from '../components/ToolBar';

/**
 * Imports Screens Admin 
*/
import { Home } from './screens';

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
                },
            }}
        >
        <Drawer.Screen name="Home" options={{title: 'Dashboard'}} component={Home} />
    </Drawer.Navigator>
  )
}
