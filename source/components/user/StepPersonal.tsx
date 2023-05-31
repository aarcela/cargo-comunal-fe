import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '../Grid';
import { TitleParagraph } from './TitleParagraph';
import { InterfaceStepUser } from './Interface';
import { BtnTabBar } from './BtnTabBar';



export const StepPersonal = ({objUser, setObjUser, next, prev}:InterfaceStepUser) => {
  return (
    <Grid container flexDirection='column' justifyContent='center' alignItems='center' position='relative' >
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
          setObjUser( values => ({...values, ...val}) );
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <BtnTabBar onPrev={() => prev('profile')} onNext={handleSubmit} />
        )}
      </Formik>
    </Grid>
  )
}
