import React from 'react';
import { ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { 
    BottomTabNavigationOptions, 
    createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import { RouteNavigation, IconItem, LabelItemStyle } from '../../interfaces/navigation';
import { Icon } from '../Icon';
import { Typography } from '../Typography';


const Tab = createBottomTabNavigator();

interface BottomTabProps {
    initialRouteName?: string;
    sceneContainerStyle?: StyleProp<ViewStyle>
    screenOptions?: BottomTabNavigationOptions;
    routes: RouteNavigation<BottomTabNavigationOptions, any, any>[]
}

export const BottomTab = ({ initialRouteName, sceneContainerStyle, screenOptions, routes }: BottomTabProps) => {
  return (
    <Tab.Navigator
        initialRouteName={initialRouteName}
        sceneContainerStyle={sceneContainerStyle}
        screenOptions={({route}) => ({
                ...screenOptions,
                tabBarIcon: ({ focused }) => {
                    const { icon } = routes.filter(item => item.name === route.name)[0];

                    if( icon ){
                        return(
                            <LabelIcon focused={focused} name={icon.name} color={icon.color} size={icon.size} />
                        )
                    }
                    
                },
                tabBarLabel: ({ focused }) => {
                    const { name, options, labelStyle  } = routes.filter(item => item.name === route.name)[0];
                    const title = options?.title ? options.title : name;

                    return(
                        <LabelText focused={focused} title={title} color={labelStyle?.color} />
                    )
                },
                tabBarStyle:{
                    ...stylesBottomTab.tabBarStyle,
                    ...[screenOptions?.tabBarStyle && screenOptions.tabBarStyle]
                }
            })
        }
    >
        {
            routes.map(({name, component, options}, index) => (
                <Tab.Screen key={index} name={name} options={options} component={component} />
            ))
        }
    </Tab.Navigator>
  )
}

type LabelIcon = IconItem & {
    focused: boolean;
}

const LabelIcon = ({ name, size, color, focused }: LabelIcon) => (
    <Icon name={name} size={size ? size : 'xl'} color={color ? color : focused ? 'dodgerBlue' : 'lynch'}  />
);


type LabelText  = LabelItemStyle & {
    title: string;
    focused: boolean;
}

const LabelText = ({ title, color, focused }: LabelText) => (
    <Typography
        fontFamily={focused ? 'Poppins-SemiBold' : 'Poppins-Medium'}
        color={color ? color : focused ? 'dodgerBlue' : 'lynch'} 
        size={11}
        styles={{
            marginBottom: 1
        }}
    >
     { title }
    </Typography>
);

const stylesBottomTab = StyleSheet.create({
    tabBarStyle: {
        height: 50,
        paddingHorizontal: 15,
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderTopWidth: 0,
        shadowColor: 'rgb(0,0,0, 0.15)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 24,
    }
});
