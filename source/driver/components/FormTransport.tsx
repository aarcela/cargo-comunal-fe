import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Hr, OutlinedInput, Button, Typography, Alert, AlertType, LoadIndicatorModal } from '../../components';
import { TransportDriver } from '../../interfaces';


const TransportSchema = Yup.object().shape({
  nro_placa: Yup.string()
  .max(20, 'Maximo, 20 caracteres')
  .required('Nro. de placa requerido'),
  carnet_circulacion: Yup.string()
  .required('Carnet circulación requerido'),
  marca: Yup.string()
  .required('Marca requerido')
  .max(20, 'Maximo, 20 caracteres'),
  modelo: Yup.string()
  .required('Modelo requerido')
  .max(20, 'Maximo, 20 caracteres'),
  carga_maxima: Yup.string()
  .required('Carga máxima requerido')
  .max(20, 'Maximo, 20 caracteres'),
});

export type TransportObject = TransportDriver;

interface FormTransport {
  objectValue: TransportObject;
  onSubmit: (values: TransportObject) => void;
  message?: string;
  typeMessage?: AlertType;
  onLoanding: boolean;
  alert: {
    show: boolean;
    type: AlertType;
    msg: string;
    onClose: () => void;
  }
  showBtn?: boolean;
}

export const FormTransport = ({
  objectValue,
  onSubmit,
  message,
  typeMessage,
  onLoanding,
  alert,
  showBtn = true
}: FormTransport) => {
  return (
    <Formik
      initialValues={objectValue}
      onSubmit={onSubmit}
      validationSchema={TransportSchema}
      >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Grid container isKeyboardAvoidingView KeyboardAvoidingViewProps={{behavior: 'padding'}} 
          bgColor='white' 
          display='flex' 
          flexDirection='column' 
          justifyContent='space-between' 
          >
          <LoadIndicatorModal 
            visible={onLoanding}
            isText={true}
            text='Creando transporte...'
            loadIndicatorProps={{
            color: "#fff"
            }}
          />
          <Alert 
            isVisible={alert.show}
            typeBg={alert.type}
            position='top'
            top={20}
            isAnimated
            children={alert.msg}
            mh={15}
            useStateOpacity={() => alert.onClose()}
          />
          <Grid spacing={1}>
              <OutlinedInput 
                value={values.nro_placa}
                onChangeText={handleChange('nro_placa')}
                labelText='Introduce el numero de placa'
                bgInput='zumthor'
                inputProps={{
                  inputMode: 'text',
                }}
                isError={ errors.nro_placa ? true : false}
                messageError={errors.nro_placa}
              />
              <OutlinedInput 
                value={values.carnet_circulacion}
                onChangeText={handleChange('carnet_circulacion')}
                labelText='Introduce tu carnet de circulación'
                bgInput='zumthor'
                inputProps={{
                  inputMode: 'text',
                }}
                isError={ errors.carnet_circulacion ? true : false}
                messageError={errors.carnet_circulacion}
              />
              <OutlinedInput 
                value={values.marca}
                onChangeText={handleChange('marca')}
                labelText='Introduce la marca'
                bgInput='zumthor'
                inputProps={{
                  inputMode: 'text',
                }}
                isError={ errors.marca ? true : false}
                messageError={errors.marca}
              />
              <OutlinedInput 
                value={values.modelo}
                onChangeText={handleChange('modelo')}
                labelText='Introduce el modelo'
                bgInput='zumthor'
                inputProps={{
                  inputMode: 'text',
                }}
                isError={ errors.modelo ? true : false}
                messageError={errors.modelo}
              />
            <OutlinedInput 
              value={values.carga_maxima}
              onChangeText={handleChange('carga_maxima')}
              labelText='Introduce la carga máxima'
              bgInput='zumthor'
              inputProps={{
                inputMode: 'numeric',
              }}
              isError={ errors.carga_maxima ? true : false}
              messageError={errors.carga_maxima}
            />
          </Grid>
          <Alert 
            isVisible={message !== undefined}
            typeBg={typeMessage}
            position='relative'
            isAnimated
            isAnimatedAutomatic={false}
            children={message}
            mh={0}
          />
            {
              showBtn &&
              <Button
                typeStyle='btn-primary'
                size='sm'
                style={{marginBottom: 15}}
                onPress={handleSubmit}
              >
                <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                  Registrar Transporte
                </Typography>
              </Button>
            }
        </Grid>
      )}
    </Formik>
  )
}
