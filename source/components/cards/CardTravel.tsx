import React from 'react'
import {  ImageProps } from 'react-native';
import { Grid, GridProps } from '../Grid'
import { Avatar } from '../Avatar'
import { Typography } from '../Typography';
import { Colors } from '../../styles/Colors';
import { Button } from '../Button';

interface CardTravelProps{

    buttom?: () => void;
    container?: GridProps;
    label: {
        user: {
            name:string;
            lastname:string;
        }
        transport:{
            name:string;
            lastname:string;
        }
        ruta: string;
        date: string;
        hora: string;
        status:string
    },
    onPress: () => void;
}

export const CardTravel = ({
    buttom,
    container,
    label,
    onPress
} : CardTravelProps ) => {
  return (
    <Grid
        display='flex'
        flexDirection='row'
        alignItems='center'
        width='100%'
        paddingHorizontal={15}
        paddingVertical={8}
        { ...container }
        bgColor='white'
        
    >
        <Button 
            onPress={onPress}
            style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 24,
                left: 15,
            }}
        />
        <Grid display='flex' spacing={0.008} paddingHorizontal={8} flexDirection='column' width='60%' justifyContent='center'>
            <Typography size={14} textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Regular' color='mineShaft'>
                Solicitante: { label.user.name } { label.user.lastname }
            </Typography>
            <Typography size={11} textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Medium' color='nobel' >
                Conductor: { label.transport.name } { label.transport.lastname }
            </Typography>
        </Grid>
        <Grid display='flex' alignItems='flex-end' spacing={0.008} flexDirection='column' width='25%' justifyContent='center'>
            <Typography size={13} fontFamily='Poppins-Regular' color='nobel'>
                { label.date }
            </Typography>
            <Typography size={10} fontFamily='Poppins-Medium'>
                { label.status }
            </Typography>
        </Grid>
    </Grid>
  )
}
