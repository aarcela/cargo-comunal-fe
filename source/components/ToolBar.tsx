import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, Dimensions, TouchableOpacity as Button } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { Typography } from './Typography';
import { Icon } from './Icon';



const heigthStatusBar = StatusBar.currentHeight;
const width = Dimensions.get('window').width;

interface ToolBarProps {
    props: StackHeaderProps | DrawerHeaderProps | BottomTabHeaderProps;
    showMenu?: boolean;
};



export const ToolBar = ({ props, showMenu = false }: ToolBarProps) => {
    const [title, setTitle] = useState('');
    const [isBottomBack, setIsBottomBack] = useState(false);

    useEffect(() => {
        let title: string = getHeaderTitle(props.options, props.route.name);

        if( 'back' in props ){
            setIsBottomBack(true);
        }

        setTitle(title);

    }, [props]);
    
    return (
        <View style={[styleToolBar.containerTop]} >
            <View style={[styleToolBar.wrapperNavbar]}>
                { isBottomBack &&
                    <Button 
                        onPress={() => props.navigation.goBack()}
                        style={[styleToolBar.contentIcon]}
                    >
                        <Icon name='arrowBackOutline' size={25} color='mineShaft' /> 
                    </Button>
                }
                <Typography 
                    fontFamily='Poppins-Medium' 
                    size={16} 
                    textProps={{
                        numberOfLines: 1
                    }} 
                    color='mineShaft'
                    styles={{
                        width:  showMenu ? 'auto' : '100%',
                        lineHeight: 22,
                        paddingLeft: isBottomBack ? 5 : 15
                    }}
                >
                    {title}
                </Typography>
                {
                    showMenu &&
                    
                    <Button
                        onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
                        style={[styleToolBar.contentIcon, {justifyContent: 'flex-end'}]}
                        activeOpacity={0.65}
                    >
      
                        <Icon name='menuOutline' size={26} color='mineShaft' />
                    </Button>
                }
            </View>
        </View>
    )
}

const styleToolBar = StyleSheet.create({
    containerTop: {
        paddingTop: heigthStatusBar,
        backgroundColor: '#fff',
    },
    wrapperNavbar: {
        height: 50,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentIcon: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        paddingHorizontal: 15
    }
})
