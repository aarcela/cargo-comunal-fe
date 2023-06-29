import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { 
  RouteShipment, 
  UbicationDestination, 
  UbicationOrigin,  
  UbicationShipment
} from '../../../interfaces/shipment';
import { 
  Button, 
  FabIcon, 
  Grid, 
  Icon, 
  OutlinedInput, 
  Typography,
  SelectInput,
  Alert
} from '../../../components';
import { OriginAndDestination } from '../OriginAndDestination';

const ShipmentSchema = Yup.object().shape({
  route: Yup.object().shape({
    name: Yup.string().required('ruta requerida'),
    value: Yup.string().required('ruta requerida')
  }),
  weightLoad: Yup.string()
  .required('Peso carga requerido')
});


interface GenerateShipmentProps{
  goBack: () => void;
}

export const GenerateShipment = ({
    goBack
}: GenerateShipmentProps) => {
  const [msgError, setMsgError] = useState<string | undefined>();
  const [ubiOrigin, setUbiOrigin] = useState<UbicationOrigin | null>(null);
  const [ubiDestination,setUbiDestination] = useState<UbicationDestination | null>(null);
  
  
  const onNext = ({route, weightLoad}: { route: RouteShipment, weightLoad: string }) => {
    if( ubiOrigin == null || ubiDestination == null   ){
      setMsgError(`Debe ingresar la ${ubiOrigin == null ? 'ubicación origen' : 'ubicación destino'} para continuar`);
      return;
    }

    const ubication : UbicationShipment = {
      origin: ubiOrigin,
      destination: ubiDestination,
      kmOriginToDestination: null
    }

    const shipment = {
      route,
      weightLoad,
      ubication: ubication
    }; 
  }

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
        <Alert 
          isVisible={msgError !== undefined}
          isAnimated
          position='top'
          children={msgError}
          typeBg='error'
          isTypeIcon='error'
          delayAutomatic={6000}
          useStateOpacity={() => setMsgError(undefined)}
        />
        <Formik
          initialValues={{ route: { name: '', value: '' }, weightLoad: '' }}
          onSubmit={values => onNext(values)}
          validationSchema={ShipmentSchema}
        >
          {({ handleChange, handleSubmit, values, errors, setFieldValue}) => (
            <>
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
                    value={values.route.name}
                    onChangeText={({label, value}) => setFieldValue('route', { name: label, value })}
                    mb={0}
                    bgInput='zumthor'
                    labelText='Selección de ruta'
                    iconRight={<Icon name='chevronDownOutline' size='lg' color='scorpion' />}
                    select={{
                      value: values.route.value,
                      placeholder:{ label: 'Seleciona una ruta', value: '' },
                      items: [
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                      ]
                    }}
                    isError={ errors.route?.value ? true : false}
                    messageError={errors.route?.value}
                  />
                  <OutlinedInput
                    value={values.weightLoad}
                    onChangeText={handleChange('weightLoad')}
                    mb={0}
                    bgInput='zumthor'
                    labelText='Ingresa el peso de la carga'
                    isError={ errors.weightLoad ? true : false}
                    messageError={errors.weightLoad}
                  />
              </Grid>
              <Button
                typeStyle='btn-primary'
                size='sm'
                style={{marginBottom: 20}}
                onPress={handleSubmit}
              >
                <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                  Continuar
                </Typography>
              </Button>
            </>
          )}
        </Formik>
       
      </Grid>
    </Grid>
  )
}
