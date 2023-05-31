import React from 'react'
import { Grid } from '../Grid'
import { Button } from '../Button'
import { Typography } from '../Typography';

type BtnTabBarProps = {
    onNext: () => void;
    onPrev?: () => void;
    textPrev?: string;
    textNext?: string;
}

export const BtnTabBar = ({
    onNext,
    onPrev,
    textNext = 'Siguiente',
    textPrev = 'Regresar'
}: BtnTabBarProps) => {
  return (
    <Grid flexDirection='row' display='flex' justifyContent='flex-end' backgroundColor='transparent' position='absolute' zIndex={1024} bottom={0} paddingVertical={6} right={0} paddingRight={15} height={50} width={'60%'}>
        {
            onPrev && 
            <Button
                size='default'
                borderWidth={1}
                typeStyle='btn-light'
                style={{marginRight: 15, paddingHorizontal: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3.2}}
                onPress={onPrev}
            >
                <Typography size='sm' styles={{lineHeight: 15,letterSpacing: 0.4}} fontFamily='Poppins-Regular' color='scorpion'>{textPrev}</Typography>
            </Button>
        }
        <Button
            size='default'
            typeStyle='btn-primary'
            style={{paddingHorizontal: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3.2}}
            onPress={onNext}
        >
            <Typography size='sm' styles={{lineHeight: 15,letterSpacing: 0.4}} fontFamily='Poppins-Medium' color='white'>{textNext}</Typography>
        </Button>
    </Grid>
  )
}
