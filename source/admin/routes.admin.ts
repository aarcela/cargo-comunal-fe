import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { RouteNavigation } from '../interfaces/navigation';

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

export const routes: RouteNavigation<DrawerNavigationOptions>[] = [
    {
        name: 'Home',
        options:{
            title: 'Dashboard'
        },
        icon: {
            name: 'homeOutline'
        },
        component: Home
    },
    {
        name: 'Transports',
        options:{
            title: 'Transportes'
        },
        icon: {
            name: 'carOutline'
        },
        component: Transports
    },
    {
        name: 'Petitions',
        options:{
            title: 'Peticiones'
        },
        icon: {
            name: 'navigateCircleOutline'
        },
        component: Petitions
    },
    {
        name: 'Reports',
        options:{
            title: 'Reportes'
        },
        icon: {
            name: 'readerOutline'
        },
        component: Reports
    },
    {
        name: 'Users',
        options:{
            title: 'Usuarios'
        },
        icon: {
            name: 'peopleOutline'
        },
        component: Users
    },
    {
        name: 'EditProfile',
        options:{
            title: 'Mi perfil'
        },
        icon: {
            name: 'personOutline'
        },
        component: EditProfile
    }
]