import React from 'react'
import { Button, Grid, Icon, OutlinedInput, Typography } from '../../../components';
import { OriginAndDestination } from '../OriginAndDestination'

export const GenerateShipment = () => {
  return (
    <Grid container justifyContent='space-between' paddingVertical={20} flexDirection='column' bgColor='white'>
      <Grid spacing={3}>
        <OriginAndDestination />
        <OutlinedInput
          value={''}
          onChangeText={(value) => console.log(value)}
          mb={0}
          bgInput='zumthor'
          labelText='Selección de ruta'
          iconRight={<Icon name='chevronDownOutline' size='lg' color='scorpion' />}
        />
        <OutlinedInput
          value={''}
          onChangeText={(value) => console.log(value)}
          mb={0}
          bgInput='zumthor'
          labelText='Ingresa el peso de la carga'
          />
      </Grid>
      <Button
        typeStyle='btn-primary'
        size='sm'
        style={{marginBottom: 20}}
        onPress={()=> null}
      >
        <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
          Continuar
        </Typography>
      </Button>
    </Grid>
  )
}
