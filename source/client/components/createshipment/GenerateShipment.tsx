import React, { useState, useContext } from 'react'
import { 
  Button, 
  FabIcon, 
  Grid, 
  Icon, 
  OutlinedInput, 
  Typography,
  ItemValue 
} from '../../../components';
import { OriginAndDestination } from '../OriginAndDestination';
import { ShipmentContext } from '../../context/shipment';

interface GenerateShipmentProps{
  goBack: () => void;
}

export const GenerateShipment = ({
    goBack
}: GenerateShipmentProps) => {
  const [route, setRoute] = useState<ItemValue>({
    label: '',
    value: ''
  });

  const { status, shipment, createShipment  } = useContext(ShipmentContext);

  return (
    <Grid container paddingTop={40} bgColor='white'>
      <FabIcon 
        onPress={goBack}
        nameIcon='arrowBackOutline'
        icon={{
          size: 'lg'
        }}
        position={{
          postion: 'relative'
        }}
      />
      <Grid display='flex' flex={1} justifyContent='space-between' paddingVertical={20} flexDirection='column'>
      <Grid spacing={3}>
        <OriginAndDestination />
          <OutlinedInput
            value={route.label}
            onChangeText={({ label, value }:ItemValue) => setRoute({label, value})}
            mb={0}
            bgInput='zumthor'
            labelText='Selección de ruta'
            iconRight={<Icon name='chevronDownOutline' size='lg' color='scorpion' />}
            select={{
              value: route.value,
              placeholder:{ label: 'Seleciona una ruta', value: '' },
              items: [
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
              ]
            }}
          />
          <OutlinedInput
            value={''}
            onChangeText={(value) => console.log(value, 'peso')}
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
    </Grid>
  )
}
