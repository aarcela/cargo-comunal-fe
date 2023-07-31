import React from 'react'
import {  ImageProps } from 'react-native';
import { Grid, GridProps } from '../Grid'
import { Avatar } from '../Avatar'
import { Typography } from '../Typography';
import { Colors } from '../../styles/Colors';
import { Button } from '../Button';

interface CardUserProps{
    avatar: {
        type: 'text' | 'image',
        text?: string;
        image?:  ImageProps;
    }
    buttom?: () => void;
    container?: GridProps;
    label: {
        title: string;
        subTitle: string;
        date: string;
        tag: string | number;
        colorTag?: keyof typeof Colors;
    },
    onPress: () => void;
}

export const CardUser = ({
    avatar,
    buttom,
    container,
    label,
    onPress
} : CardUserProps ) => {
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
        <Grid width='15%'>
            { avatar.type == 'text' && avatar.text &&
                <Avatar
                    width='100%'
                    height={50}
                    radius={50}
                    labelAvatar={avatar.text}
                    labelProps={{size: 'lg'}}
                />
            }
        </Grid>
        <Grid display='flex' spacing={0.008} paddingHorizontal={8} flexDirection='column' width='60%' justifyContent='center'>
            <Typography size={14} textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Regular' color='mineShaft'>
                { label.title }
            </Typography>
            <Typography size={11} textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Medium' color='nobel' >
                { label.subTitle }
            </Typography>
        </Grid>
        <Grid display='flex' alignItems='flex-end' spacing={0.008} flexDirection='column' width='25%' justifyContent='center'>
            <Typography size={13} fontFamily='Poppins-Regular' color='nobel'>
                { label.date }
            </Typography>
            <Typography size={10} fontFamily='Poppins-Medium' color={label.colorTag ? label.colorTag : 'info'} >
                { label.tag }
            </Typography>
        </Grid>
    </Grid>
  )
}
