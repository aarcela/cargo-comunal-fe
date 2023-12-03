import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { Grid } from '../Grid';
import { TitleParagraph } from './TitleParagraph';
import { InterfaceStepUser } from './Interface';
import { BtnTabBar } from './BtnTabBar';
import { TextField } from '../TextField';
import { Icon } from '../Icon';
import { UserEntity } from '../../interfaces';

interface StepExtraProps extends InterfaceStepUser{
  onSubmit: (val: any) => void;
}

const StepExtraSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Minimo 4 caracteres')
    .max(20, 'Maximo 20 caracteres')
    .matches(/^[a-z0-9_-]{4,20}$/, 'Debe contener solo letras, numero y guion bajo')
    .required('Nombre de usuario requerido'),
  phone: Yup.string()
    .min(10, 'Minimo 10 caracteres')
    .max(11, 'Maximo 11 caracteres')
    .matches(/^[0-9]+$/, 'Solo debe contener numeros y sin espacios')
    .required('Teléfono Requerido'),
  email: Yup.string()
  .email('correo electrónico no valido')
  .required('correo electrónico'),
  password: Yup.string()
  .min(6, 'Minimo 6 caracteres')
  .max(12, 'Maximo, 12 caracteres')
  .required('Contraseña requerido')
});

export const StepExtra = ({objUser, setObjUser,onSubmit, prev}: StepExtraProps) => {
  const [securePass, setSecurePass] = useState(true);
  return (
    <Grid container flexDirection='column' justifyContent='center' alignItems='center' position='relative' paddingVertical={20}>
      <TitleParagraph title='Información adicional' paragraph='Por favor completa este último paso para finalizar el registro' />
      <Formik
        initialValues={{    
          email:              objUser.email,
          username:           objUser.username,
          phone:              objUser.phone,
          password:           objUser.password
        }}
        onSubmit={val => {
          setObjUser(val);
          onSubmit(val);
        }}
        validationSchema={StepExtraSchema}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <ScrollView style={{width: '100%', marginTop: 20, marginBottom: 30}}>
              <TextField 
                labelText='Nombre de usuario'
                value={getIn(values.username, 'username')}
                onChangeText={handleChange('username')}
                inputProps={{
                    keyboardType: 'default'
                }}
                isError={ errors.username ? true : false}
                messageError={errors.username}
              />
              <TextField 
                labelText='Correo electrónico'
                value={getIn(values.email, 'email')}
                onChangeText={handleChange('email')}
                inputProps={{
                  keyboardType: 'email-address'
                }}
                isError={ errors.email ? true : false}
                messageError={errors.email}
                iconRight={<Icon name='mailOutline' size='lg' color='rollingStone' />} 
              />
              <TextField 
                labelText='Teléfono'
                value={getIn(values.phone, 'phone')}
                onChangeText={handleChange('phone')}
                inputProps={{
                  keyboardType: 'numeric'
                }}
                isError={ errors.phone ? true : false}
                messageError={errors.phone}
                iconRight={<Icon name='call' size='lg' color='rollingStone' />} 
              />
              <TextField 
                labelText='Contraseña'
                value={getIn(values.password, 'password')}
                onChangeText={handleChange('password')}
                isError={ errors.password ? true : false}
                messageError={errors.password}
                iconRight={<Icon name={(securePass == true) ? 'eyeOffOutline' : 'eyeOutline'} size={18} color='rollingStone' />}
                onPressIconRight={() => setSecurePass((securePass) ? false: true)}
                inputProps={{
                secureTextEntry: securePass
                }} 
              />
            </ScrollView>
            <BtnTabBar onPrev={() => prev('personal')} onNext={handleSubmit} textNext='Guardar' />
          </>
          
        )}
      </Formik>
    </Grid>
  )
}
