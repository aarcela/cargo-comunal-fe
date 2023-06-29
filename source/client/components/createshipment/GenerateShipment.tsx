import React, { useState, useContext } from 'react';
import { ShipmentContext } from '../../context/shipment';
import { 
  Button, 
  FabIcon, 
  Grid, 
  Icon, 
  OutlinedInput, 
  Typography,
  ItemValue,
  SelectInput
} from '../../../components';
import { OriginAndDestination } from '../OriginAndDestination';
import { MethodPayment, UbicationDestination, UbicationOrigin  } from '../../../interfaces';

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

  const [ubiOrigin, setUbiOrigin] = useState<UbicationOrigin | null>(null);
  const [ubiDestination,setUbiDestination] = useState<UbicationDestination | null>(null);
  const [methodPayment, setmethodPayment] = useState<MethodPayment | null>();
  const [weightLoad, setWeightLoad] = useState<string | number>('');

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
          <OriginAndDestination
            origin={ubiOrigin}
            destination={ubiDestination} 
            onChangeMap={(type, data) => {
              if( type == 'origin' ){
                setUbiOrigin(data);
              }else{
                setUbiDestination(data);
              }
            }}
          />
            <SelectInput
              value={route.label}
              onChangeText={({ label, value }:ItemValue) => {
                setRoute({label, value})
                setmethodPayment(val => ({...val, id: value, name: label, img: ''}))
              }}
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
              value={weightLoad}
              onChangeText={(value) => setWeightLoad(value)}
              mb={0}
              bgInput='zumthor'
              labelText='Ingresa el peso de la carga'
            />
        </Grid>
        <Button
          typeStyle='btn-primary'
          size='sm'
          style={{marginBottom: 20}}
          onPress={()=> {
            console.log(ubiOrigin)
          }}
        >
          <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
            Continuar
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}
