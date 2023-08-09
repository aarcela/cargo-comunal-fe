import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Icon, TextField, TitleParagraph } from '../../components';

const PassResetSchema = Yup.object().shape({
  email: Yup.string()
  .email('correo electrónico no valido')
  .required('correo electrónico')
});

export const PasswordReset = () => {
  return (
    <Grid container isKeyboardAvoidingView KeyboardAvoidingViewProps={{behavior: 'padding'}} bgColor='zircon' justifyContent='center'>
      <TitleParagraph title='Recuperar Contraseña' paragraph='Ingresa el correo eletrónico, que registraste en el sistema.' />
      <Formik
        initialValues={{ email: ''}}
        onSubmit={(values) => console.log(values)}
        validationSchema={PassResetSchema}
        >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TextField 
              labelText='Correo electrónico'
              value={values.email}
              onChangeText={handleChange('email')}
              inputProps={{
                  keyboardType: 'email-address'
              }}
              isError={ errors.email ? true : false}
              messageError={errors.email}
              iconRight={<Icon name='mailOutline' size='lg' color='rollingStone' />} 
            />
          </>
        )}
      </Formik>
    </Grid>
  )
}
