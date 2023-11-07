import React, { useEffect, useRef } from 'react';
import { Animated, Modal, View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { Typography } from './Typography';
import { Collapse } from './Collapse';
import { Icon } from './Icon';
import { Grid } from './Grid';
import { Button } from './Button';

interface PermissionNotificationProps{
    visible: boolean;
    onCancel: () => void;
    onAccept: () => void;
}

export const PermissionNotification = ({
    visible,
    onAccept,
    onCancel
}: PermissionNotificationProps) => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const { width } = useWindowDimensions();


    useEffect(() => {
      if( visible ){
        Animated.spring(scaleValue, {
            toValue: 1,
            damping: 300,
            useNativeDriver: true,
        }).start();
      }else{
        Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
      }
    }, [visible])
    
    return(
        <Modal 
            visible={visible} 
            statusBarTranslucent 
            transparent 
            animationType='fade'
        >
            <SafeAreaView
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Animated.View
                    style={{
                        width: width - 40,
                        elevation: 20,
                        backgroundColor: '#fff',
                        borderRadius: 4,
                        transform: [{scale: scaleValue}]}
                    }
                >
                    <View
                        style={{
                            padding: 15
                        }}
                    >
                        <Collapse
                            title='Para mejorar la experiencia, activa las Notificaciones del dispositivo.'
                            typographyProps={{
                                color: 'mineShaft'
                            }}
                        >
                            <Typography size={14} styles={{marginBottom: 10}}>
                                Tu dispositivo necesitará lo siguiente:
                            </Typography>
                            <View
                                style={[styles.item]}
                            >
                                <Icon 
                                    name='mailOutline'
                                    size={28}
                                    color='curiousBlue'
                                    style={{marginRight: 10}}
                                />
                                <Typography size={13} styles={{marginRight: 70 }}>
                                    Activar notificaciones
                                </Typography>
                            </View>
                        </Collapse>
                        <Grid
                            marginTop={25}
                            display='flex'
                            flexDirection='row'
                            justifyContent='flex-end'
                        >
                            <Button onPress={onCancel} >
                                <Typography fontFamily='Poppins-Medium' color='curiousBlue'>
                                    No, gracias
                                </Typography>
                            </Button>
                            <Button style={{marginLeft: 30}} onPress={onAccept}>
                                <Typography fontFamily='Poppins-Medium' color='curiousBlue'>
                                   Aceptar
                                </Typography>
                            </Button>
                        </Grid>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        width: '100%'
    }, 
})

