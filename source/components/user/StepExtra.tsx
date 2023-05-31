import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '../Grid';
import { TitleParagraph } from './TitleParagraph';
import { InterfaceStepUser } from './Interface';
import { BtnTabBar } from './BtnTabBar';

export const StepExtra = ({objUser, setObjUser, next, prev}:InterfaceStepUser) => {
  return (
    <Grid container flexDirection='column' justifyContent='center' alignItems='center' position='relative' >
      <TitleParagraph title='Información adicional' paragraph='Por favor completa este último paso para finalizar el registro' />
      <Formik
        initialValues={{    
            email:              objUser.email,
            username:           objUser.username,
            phone:              objUser.phone,
        }}
        onSubmit={val => {
          setObjUser( values => ({...values, ...val}) );
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <BtnTabBar onPrev={() => prev('personal')} onNext={handleSubmit} />
        )}
      </Formik>
    </Grid>
  )
}
