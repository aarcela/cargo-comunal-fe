import React from 'react';

// import toolbar, drawer y sidenav component

import { ToolBar } from '../components/ToolBar';
import { SideNav } from '../components/SideNav';
import { Drawer } from '../components/navigation';


// import routes
import { routes } from './routes.admin';

export const NavigationAdmin = () => {

    return (
        <Drawer 
            screenOptions={{
                header: (props) => <ToolBar props={props} showMenu={true} />,
            }}
            routes={routes}
            drawerContent={(props) => <SideNav drawerContent={props} routes={routes} splitSection showSection={1} />}
        />
    )
}
