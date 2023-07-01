import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, TextStyle, Animated, useWindowDimensions } from 'react-native';
import { Colors } from '../styles';
import { Icon } from './Icon';
import { Typography } from './Typography';

type AlertType = 'error' | 'warning' | 'info' | 'success';
type AlertProps = {
    position?: 'top' | 'bottom' | 'relative';
    typeBg?: AlertType | 'default';
    isTypeIcon?: AlertType | 'none';
    isTypeTxt?: AlertType | 'default';
    isShowTitle?: boolean;
    textTitle?: React.ReactNode;
    children: React.ReactNode | string;
    styleChildren?: TextStyle;
    isAnimated?: boolean;
    isAnimatedAutomatic?: boolean;
    useStateOpacity?: () => void;
    isVisible?: boolean;
    delayAutomatic?: number;
    durationFadeIn?: number;
    duartionFadeOut?: number;
    translateYAnimate?: boolean;
    mh?: number;
    top?: number;
    bottom?: number;
}


const getColor = (type: AlertType) => {
    switch (type) {
        case 'error':
            return Colors.alertbgError;
        case 'warning':
            return Colors.alertbgWarning;
        case 'info':
            return Colors.alertbgInfo;
        case 'success':
            return Colors.alertbgSuccess;
    }
}


export const Alert = ({
    position = 'top',
    typeBg = 'default',
    isTypeIcon = 'none',
    isTypeTxt = 'default',
    isShowTitle = false,
    textTitle,
    children,
    styleChildren,
    isAnimated = false,
    useStateOpacity,
    isVisible = true,
    isAnimatedAutomatic = true,
    delayAutomatic = 3000,
    duartionFadeOut = 1000,
    durationFadeIn = 1000,
    translateYAnimate = true,
    mh = 0,
    top = 0,
    bottom = 0
}: AlertProps) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const { width } = useWindowDimensions()

    useEffect(() => {
        if( isVisible ){

            if( isAnimatedAutomatic ){
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                }),
                Animated.delay(delayAutomatic),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                ]).start(() => {
                    if( useStateOpacity ) useStateOpacity()
                });
            }else{
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: durationFadeIn,
                    useNativeDriver: true,
                }).start();
            }
        }else if( !isVisible ){
            Animated.timing(opacity, {
                toValue: 0,
                duration: duartionFadeOut,
                useNativeDriver: true,
            }).start();
        }

    }, [isVisible]);
    
    return(
        <>
            {
                isAnimated ? (
                    <Animated.View
                        style={[
                            {
                                opacity: opacity
                            },
                            translateYAnimate && {
                                transform: [
                                    {
                                        translateY: opacity.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [ position == 'bottom' ? 0 : -20, position == 'top' ? 0 : -20 ],
                                        }),
                                    }
                                ],
                            },
                            {backgroundColor: typeBg == 'default' ? Colors.white : getColor(typeBg)},
                            [position != 'relative' && styleAlert.isShadow],
                            {
                                position: position == 'relative' ? 'relative' : 'absolute',
                                marginHorizontal: mh,
                                zIndex: 1,
                                left: 0,
                                width: position != 'relative' ? width - 30 : '100%'
                            },
                            [position == 'top' && { top: top }],
                            [position == 'bottom' && { bottom: bottom }],
                        ]}
                    >
                        <Childrens 
                            isTypeIcon = {isTypeIcon}
                            isTypeTxt = {isTypeTxt}
                            isShowTitle  = {isShowTitle}
                            textTitle = {textTitle}
                            children = {children}
                            styleChildren = {styleChildren}
                        />
                    </Animated.View>
                ): (
                    <View
                        style={[
                            styleAlert.alert,
                            {backgroundColor: typeBg == 'default' ? Colors.white : getColor(typeBg)},
                            [position != 'relative' && { marginHorizontal: 15}],
                            [position != 'relative' && styleAlert.isShadow]
                        ]}
                    >
                        <Childrens 
                            isTypeIcon = {isTypeIcon}
                            isTypeTxt = {isTypeTxt}
                            isShowTitle  = {isShowTitle}
                            textTitle = {textTitle}
                            children = {children}
                            styleChildren = {styleChildren}
                        />
                    </View>
                )
            }
        </>
    );
}


const Childrens = ({
    isTypeIcon = 'none',
    isTypeTxt = 'default',
    isShowTitle = false,
    textTitle,
    children,
    styleChildren
}: AlertProps) => {
    const [w, setW] = useState(0);

    return(
    <View
        onLayout={(e) => setW(e.nativeEvent.layout.width)}
        style={[
            styleAlert.alert,
            {
                alignItems: 'center'
            }
        ]}
    >
        {
            isTypeIcon != 'none' &&
            <View 
                style={[
                    {
                        height: 45,
                        width: 45,
                        borderRadius: 40,
                        borderWidth: 6,
                        borderColor: getColor(isTypeIcon),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    [isTypeIcon == 'error' && styleAlert.bgIconError],
                    [isTypeIcon == 'warning' && styleAlert.bgIconWarning],
                    [isTypeIcon == 'info' && styleAlert.bgIconInfo],
                    [isTypeIcon == 'success' && styleAlert.bgIconSuccess],
                    {

                    }
                ]}
            >
                <Icon 
                    name={isTypeIcon == 'error' ? 'alertCircleOutline' : isTypeIcon == 'warning' ? 'warningOutline' : isTypeIcon == 'info' ? 'informationCircleOutline': 'checkmarkDoneCircleOutline'} 
                    color='white' 
                    size='lg' 
                />
            </View>
        }
        <View
            style={{
                marginLeft: 10,
                width: w !== 0 ? w - 71 : undefined
            }}
        >
            {
            isShowTitle &&
                <Typography 
                    size='md' 
                    fontFamily='Poppins-Medium' 
                    color={isTypeTxt == 'error' ? 'error' : isTypeTxt == 'warning' ? 'warning': isTypeTxt == 'info' ? 'info' : isTypeTxt == 'success' ? 'success' : 'mineShaft'}
                    styles={{textTransform: 'capitalize'}}
                >
                    { textTitle ? textTitle : isTypeTxt != 'default' ? isTypeTxt : '' }
                </Typography>
            }
            <Typography
                size='sm' 
                fontFamily='Poppins-Regular'
                color={isTypeTxt == 'error' ? 'error' : isTypeTxt == 'warning' ? 'warning': isTypeTxt == 'info' ? 'info' : isTypeTxt == 'success' ? 'success' : 'tundora'}
                styles={{
                    ...styleChildren,
                    paddingTop: isShowTitle ? 0 : 5
                }}
            >
                {children}
            </Typography>
        </View>
    </View>
    )
}

const styleAlert = StyleSheet.create({
    bgIconError: {
        backgroundColor: "#FF5A5F"
    },
    bgIconWarning: {
        backgroundColor: Colors.warning
    },
    bgIconInfo: {
        backgroundColor: 'rgb(2, 136, 209)'
    },
    bgIconSuccess: {
        backgroundColor: Colors.success
    },
    alertContainer: {
        
    },
    alert: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
    },
    isShadow: {
        shadowColor: 'rgb(0,0,0, 0.25)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 8,
    }
})