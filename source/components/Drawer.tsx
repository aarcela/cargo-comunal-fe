import React, { ReactNode } from 'react';
import { Image, StatusBar } from 'react-native';
import { 
  DrawerContentComponentProps, 
  DrawerContentScrollView 
} from '@react-navigation/drawer';
import { Grid } from './Grid';
import { Button } from './Button';
import { Icon } from './Icon';
import { Typography } from './Typography';
import { Avatar } from './Avatar';
import { Hr } from './Hr';
import { Colors, IoniconsName } from '../styles';


export interface DrawerProps{
  drawerContent: DrawerContentComponentProps;
  routes: RouteProps[];
  splitSection?: boolean;
  showSection?: number;
  onLogout?: () => void; 
}

const heigthStatusBar = StatusBar.currentHeight;

export const Drawer = ({ drawerContent: { navigation, state }, routes, showSection, splitSection = false, onLogout }: DrawerProps) => {
  return (
    <Grid container paddingTop={heigthStatusBar}>
      <Grid display='flex' alignItems='center' flexDirection='row' justifyContent='space-between' height={50}>
        <Grid height={42} width={42} >
          <Image 
            source={require('../assets/images/logo.png')}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              resizeMode: 'contain'
            }}
          />
        </Grid>
        <Button onPress={() => navigation.closeDrawer()}>
          <Icon name='closeCircle' size={28} color='radicalRed' />
        </Button>
      </Grid>
      <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
        <Avatar 
          height={80}
          width={80} 
          radius={80}
          labelAvatar='AL'
          labelProps={{
            size: 'xl'
          }}
        />
        <Typography
          size='lg'
          fontFamily='Poppins-SemiBold'
          color='mineShaft'
          styles={{marginTop: 10}}
        >
          Abraham Freitez
        </Typography>
        <Typography
          size='sm'
        >
          Administrador
        </Typography>
      </Grid>
      <Hr mt={15} />
      <DrawerContentScrollView>
        {
          routes.map((item, index) => {
            const showHr = showSection && routes.length - showSection === index + 1 ? true : false;

            return (
              <>
                <DrawerItem
                  onPress={() => navigation.navigate(item.name)}
                  key={index}
                  focused={item.index === state.index} 
                  label={item.label}
                  icon={item.icon}
                />
                { splitSection && showHr && <Hr key={Math.random()} mt={15} mb={15} /> }
              </>
            )
          })
        }
        {
          onLogout && 
          <DrawerItem
            focused={false} 
            onPress={onLogout}
            label={{
              title: 'Cerrar Sesión',
              color: 'radicalRed'
            }}
            icon={{
              name: 'logOutOutline',
              color: 'radicalRed'
            }}
          />
        }
      </DrawerContentScrollView>
    </Grid>
  )
}

export interface RouteProps extends RouteDrawerItem{
  index: number;
  name: string;
}

type LabelDrawerItem = {
  title: string;
  color?: keyof typeof Colors;
}

type IconDrawerItem = {
  name: keyof typeof IoniconsName;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: keyof typeof Colors;
}

interface RouteDrawerItem {
  label: LabelDrawerItem;
  icon?: IconDrawerItem
}

interface DrawerItemProps extends RouteDrawerItem{
  focused: boolean;
  onPress?: () => void;
}

const DrawerItem = ({ focused, label, icon, onPress }: DrawerItemProps) => (
  <Button
    onPress={onPress}
    activeOpacity={0.60}
    size='default'
    bgColor={focused ? 'zumthor' : 'transparent'}
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      marginBottom: focused ? 6 : 2,
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: focused ? 10 : 5
    }}
  >
    { icon?.name && 
      <Icon 
        name={icon.name} 
        size={icon.size ? icon.size : 'lg'} 
        color={ icon.color ? icon.color : focused ? 'dodgerBlue' : 'lynch' }
      /> 
    }
    <Grid marginLeft={icon ? 15 : 0} >
      <Typography 
        fontFamily={ focused ? 'Poppins-Medium': 'Poppins-Regular'}
        color={ label.color ? label.color : focused ? 'dodgerBlue' : 'lynch' }
        size='md'
        styles={{
          textAlignVertical: 'center',
          marginTop: 3,
          lineHeight: 22,
        }}
      >
        {label.title}
      </Typography>
    </Grid>
  </Button>
);
