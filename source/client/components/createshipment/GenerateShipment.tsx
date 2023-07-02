import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { 
  RouteShipment, 
  UbicationDestination, 
  UbicationOrigin,  
  UbicationShipment,
  WeightLoadShipment
} from '../../../interfaces/shipment';
import { 
  Button, 
  FabIcon, 
  Grid, 
  Icon, 
  OutlinedInput, 
  Typography,
  SelectInput,
  Alert, 
  LoadIndicatorModal
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
  active: boolean;
  goBack: () => void;
  next: (data: GenerateShipmentData) => void;
}

export interface GenerateShipmentData{
  ubication: UbicationShipment;

  routeS: RouteShipment;

  weightLoad: WeightLoadShipment;
}

export const GenerateShipment = ({
    goBack,
    next,
    active = true
}: GenerateShipmentProps) => {
  const [msgError, setMsgError] = useState<string | undefined>();
  const [ubiOrigin, setUbiOrigin] = useState<UbicationOrigin | null>(null);
  const [ubiDestination,setUbiDestination] = useState<UbicationDestination | null>(null);
  const [routeShipment, setRouteShipment] = useState<RouteShipment>({ name: '', value: '' });
  const [weightLoadShipment, setWeightLoadShipment] = useState<WeightLoadShipment>('');
  
  const [isLazy, setIsLazy] = useState(true);

  useEffect(() => { 
    
    if( active ){
      setIsLazy(true);
      setTimeout(() => {
        setIsLazy(false);
      }, 500);
    }else{
      setIsLazy(false);
    }
  
  }, [active])
  

  const onNext = ({route, weightLoad}: { route: RouteShipment, weightLoad: WeightLoadShipment }) => {
    if( ubiOrigin == null || ubiDestination == null   ){
      setMsgError(`Debe ingresar la ${ubiOrigin == null ? 'ubicación origen' : 'ubicación destino'} para continuar`);
      return;
    }

    const ubication : UbicationShipment = {
      origin: ubiOrigin,
      destination: ubiDestination,
      kmOriginToDestination: null
    }

    setRouteShipment(route);
    setWeightLoadShipment(weightLoad);

    const data = {
      routeS: route,
      weightLoad,
      ubication: ubication
    }; 

    next(data);
  }

  return (
    <Grid container paddingTop={40} bgColor='white'>
      <Alert 
        isVisible={msgError !== undefined}
        isAnimated
        position='top'
        children={msgError}
        typeBg='error'
        isTypeIcon='error'
        delayAutomatic={6000}
        mh={15}
        useStateOpacity={() => setMsgError(undefined)}
      />
      <LoadIndicatorModal 
        visible={isLazy}
        bgColorModal='white'
        isText={false}
        loadIndicatorProps={{
          color: "#3292E1"
        }}
      />
      {
        !isLazy && active &&
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
      }
      {
        !isLazy && active &&
        <Grid display='flex' flex={1} justifyContent='space-between' paddingVertical={20} flexDirection='column'>
        <Formik
          initialValues={{ route: routeShipment, weightLoad: weightLoadShipment }}
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
                        { label: 'Ruta 1', value: 0 },
                        { label: 'Ruta 2', value: 1 },
                        { label: 'Ruta 3', value: 2 },
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
                    inputProps={{
                      keyboardType: 'numeric'
                    }}
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
      }
    </Grid>
  )
}
