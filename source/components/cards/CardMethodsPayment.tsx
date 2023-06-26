import React, { useMemo } from 'react';
import { Image, ImageProps } from 'react-native'
import { Button } from '../Button'
import { Grid } from '../Grid'
import { Typography } from '../Typography';
import { Icon } from '../Icon';

interface CardMethodsPaymentProps{
    image?: ImageProps;
    iconRadio?: boolean;
    checked?: {
        check: boolean,
        val: any,
        onChangeValue: (val:any) => void;
    }
    text:{
        titleUp: string;
        subTitleDown?: string;
        subTitleDownVal?: string;
    }
    children?: React.ReactNode;
}

export const CardMethodsPayment = ({
    image,
    iconRadio = true,
    checked,
    text,
    children
}: CardMethodsPaymentProps) => {
    const memoizedValue = useMemo(() => checked?.check, [checked?.check])
    return (
        <Button
            borderWidth={1}
            bgColor='white'
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 15,
                borderRadius: 4,
                width: '100%',
                borderColor: '#DADADA'
            }}
            onPress={() => checked?.onChangeValue ? checked.onChangeValue(checked.val) : null}
        >
            <Grid 
                width={'25%'}
            >
                <Grid display='flex' position='relative' alignItems='flex-end' height={50} justifyContent='center' width='100%'>
                    {
                        image &&
                        <Image 
                            source={image.source}
                            style={{
                                maxHeight: '100%',
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
                paddingRight={15}
            >
                <Grid width='70%' spacing={0} paddingRight={0}>
                    {
                        children ? children :
                        <Grid>
                            <Typography size={13} color='tundora' styles={{marginBottom: 5}} textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Medium'>{text.titleUp}</Typography>

                            <Grid flexDirection='row'>
                                {
                                    text.subTitleDown && 
                                    <Typography size={11} color='gray' fontFamily='Poppins-Light' textProps={{ numberOfLines: 1 }} styles={{marginRight: 5, textTransform: 'capitalize'}} >{text.subTitleDown}</Typography>
                                }
                                
                                {
                                    text.subTitleDownVal &&
                                    <Typography size={12} color='gray' fontFamily='Poppins-Medium' textProps={{ numberOfLines: 1 }} >{text.subTitleDownVal}</Typography>
                                }
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <Grid width='30%' alignItems='flex-end' justifyContent='center'>
                    {
                        iconRadio ? 
                        <Icon name={ memoizedValue ? 'radioButtonOnOutline' : 'radioButtonOffOutline'} size='lg' color='royalBlue' />
                        :
                        <Typography size={11} color='gray' textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Light' > </Typography>
                    }
                </Grid>
            </Grid>
        </Button>
  )
}
