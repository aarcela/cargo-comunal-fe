import React from 'react'
import { Grid } from './Grid'
import { Button } from './Button'
import { Typography } from './Typography';

interface ButtomFilterProps{
    onFilter: () => void;
    onReset: () => void;
}

export const ButtomFilter = ({
    onFilter,
    onReset
}: ButtomFilterProps) => {
  return (
    <Grid marginTop={25} display='flex' flexDirection='row'>
        <Grid width={'50%'} paddingRight={10}>
            <Button
                typeStyle='btn-primary'
                size='sm'
                onPress={onFilter}
            >
                <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                    Filtrar
                </Typography>
            </Button>
        </Grid>
        <Grid width={'50%'} paddingLeft={10}>
            <Button
                typeStyle='btn-light'
                borderWidth={1}
                size='sm'
                onPress={onReset}
            >
            <Typography color='rollingStone' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 23}}>
                Limpiar
            </Typography>
            </Button>
        </Grid>
    </Grid>
  )
}
