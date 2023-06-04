import React from 'react';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '../Grid';
import { TitleParagraph } from './TitleParagraph';
import { InterfaceStepUser } from './Interface';
import { BtnTabBar } from './BtnTabBar';
import { TextField } from '../TextField';
import { Icon } from '../Icon';

const StepPersonalSchema = Yup.object().shape({
  first_name: Yup.string()
  .required('Primer nombre requerido'),
  first_surname: Yup.string()
  .required('Primer apellido requerido'),
  ci: Yup.string()
    .min(6, 'Minimo 6 caracteres')
    .max(12, 'Maximo 12 caracteres')
    .matches(/^[0-9]+$/, 'Solo debe contener numeros y sin espacios')
    .required('Cédula de identidad requerido'),
  fecha_nc: Yup.string().required('Fecha de nacimiento requerido')
});

export const StepPersonal = ({objUser, setObjUser, next, prev}:InterfaceStepUser) => {
  return (
    <Grid container  flexDirection='column' justifyContent='center' alignItems='center' position='relative' paddingVertical={20} >
      <TitleParagraph title='Datos Personales' paragraph='Completa este paso, ingresando tus datos personales.' />
      <Formik
        initialValues={{    
          first_name:     objUser.first_name,
          second_name:    objUser.second_name,
          first_surname:  objUser.first_surname,
          second_surname: objUser.second_surname,
          ci:             objUser.ci,
          fecha_nc:       objUser.fecha_nc
        }}
        onSubmit={val => {
          setObjUser(val);
          next('extra');
        }}
        validationSchema={StepPersonalSchema}
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <>
            <ScrollView style={{width: '100%', marginTop: 20, marginBottom: 30}}>
              <TextField 
                labelText='Primer nombre'
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                inputProps={{
                    keyboardType: 'default'
                }}
                isError={ errors.first_name ? true : false}
                messageError={errors.first_name}
              />
              <TextField 
                labelText='Segundo nombre'
                value={values.second_name}
                onChangeText={handleChange('second_name')}
                inputProps={{
                    keyboardType: 'default'
                }}
                isError={ errors.second_name ? true : false}
                messageError={errors.second_name}
              />
              <TextField 
                labelText='Primer apellido'
                value={values.first_surname}
                onChangeText={handleChange('first_surname')}
                inputProps={{
                    keyboardType: 'default'
                }}
                isError={ errors.first_surname ? true : false}
                messageError={errors.first_surname}
              />
              <TextField 
                labelText='Segundo apellido'
                value={values.second_surname}
                onChangeText={handleChange('second_surname')}
                inputProps={{
                    keyboardType: 'default'
                }}
                isError={ errors.second_surname ? true : false}
                messageError={errors.second_surname}
              />
              <TextField 
                labelText='Cédula de identidad'
                value={values.ci}
                onChangeText={handleChange('ci')}
                inputProps={{
                    keyboardType: 'numeric'
                }}
                isError={ errors.ci ? true : false}
                messageError={errors.ci }
              />
              <TextField
                isDate 
                labelText='Fecha de nacimiento'
                value={values.fecha_nc}
                onChangeText={value => setFieldValue('fecha_nc', value)}
                inputProps={{
                    keyboardType: 'default'
                }}
                isError={ errors.fecha_nc ? true : false}
                messageError={errors.fecha_nc }
                iconRight={<Icon name='calendar' size='lg' color='rollingStone' />} 
              />
            </ScrollView>
            <BtnTabBar onPrev={() => prev('profile')} onNext={handleSubmit} />
          </>
        )}
      </Formik>
    </Grid>
  )
}
