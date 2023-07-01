import React, { useEffect, useMemo } from 'react';
import { Image, ImageProps } from 'react-native';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Icon } from '../Icon';


interface CardTruckProps {
    image?: ImageProps;
    iconRadio?: boolean;
    checked?: {
        check: boolean,
        val: any,
        onChangeValue: (val:any) => void;
    }
}

export const CardTruck = ({
    image,
    iconRadio = false,
    checked
}: CardTruckProps) => {
  const memoizedValue = useMemo(() => checked?.check,[checked?.check])
    
  return (
    <Button
        bgColor={ memoizedValue ? 'zumthor' : !memoizedValue ? 'white' : 'white' }
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 4,
            borderBottomWidth:1,
            borderBottomColor:'#C8C8C8'
        }}
        onPress={() => checked?.onChangeValue ? checked.onChangeValue(checked.val) : null}
    >
        <Grid 
            width={'25%'}
        >
            <Grid display='flex' position='relative' alignItems='flex-end' justifyContent='center' height={95} width='100%'>
                {
                    image &&
                    <Image 
                        source={image.source}
                        style={{
                            maxWidth: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                }
            </Grid>
        </Grid>
        <Grid
            width='75%'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            paddingLeft={8}
            paddingVertical={15}
        >
            <Grid width='70%' spacing={0} paddingRight={0}>
                <Typography size={13} color='tundora' styles={{marginBottom: 5}} textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Medium'>Toyota Innova</Typography>
                <Typography size={11} color='gray' fontFamily='Poppins-Light' textProps={{ numberOfLines: 2 }} >Carga Máxima:  100kg</Typography>
            </Grid>
            <Grid width='30%' alignItems='flex-end'>
                <Typography size={13} color='tundora' textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Medium'>$120.00</Typography>
                {
                    iconRadio ? 
                    <Icon name={ memoizedValue ? 'radioButtonOnOutline' : 'radioButtonOffOutline'} size='md' color='royalBlue' />
                    :
                    <Typography size={11} color='gray' textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Light' > </Typography>
                }
            </Grid>
        </Grid>
    </Button>
  )
}
