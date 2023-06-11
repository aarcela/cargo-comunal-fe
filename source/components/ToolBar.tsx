import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import { Button } from './Button';
import { Typography } from './Typography';
import { Icon } from './Icon';


const heigthStatusBar = StatusBar.currentHeight;
const width = Dimensions.get('window').width;

type ToolBarProps = StackHeaderProps;

export const ToolBar = (props: ToolBarProps) => {
    const [title, setTitle] = useState('');
    const [isBottomBack, setIsBottomBack] = useState(false);

    useEffect(() => {
        let title: string = '';

        if( props as StackHeaderProps ){
            title = getHeaderTitle(props.options, props.route.name);
            setIsBottomBack(true);
        }

        setTitle(title);

    }, [props]);
    
    return (
        <View style={[styleToolBar.containerTop]}>
            <View style={[styleToolBar.wrapperNavbar]}>
                { isBottomBack &&
                    <Button 
                        typeStyle='default'
                        size='default'
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
                        width: '100%',
                        lineHeight: 22
                    }}
                >
                    {title}
                </Typography>
            </View>
        </View>
    )
}

const styleToolBar = StyleSheet.create({
    containerTop: {
        paddingTop: heigthStatusBar,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    wrapperNavbar: {
        height: 50,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentIcon: {
        height: '100%',
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
    }
})
