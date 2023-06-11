import React, { useState } from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { 
    Grid, 
    Button, 
    Typography, 
    TextField, 
    Icon 
} from '../../components';

const SigninSchema = Yup.object().shape({
    email: Yup.string()
    .email('correo electrónico no valido')
    .required('correo electrónico'),
    password: Yup.string()
    .min(6, 'Minimo 6 caracteres')
    .max(10, 'Maximo, 12 caracteres')
    .required('Contraseña requerido')
});

export const Login = () => {
    const [securePass, setSecurePass] = useState(true);

    return (
        <Grid container isKeyboardAvoidingView KeyboardAvoidingViewProps={{behavior: 'padding'}} bgColor='zircon' justifyContent='center'>
            <Grid alignItems='center' justifyContent='center' marginBottom={40}>
                <Grid height={120} marginBottom={20}>
                    <Image 
                    source={require('../../assets/images/box-location.png')}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        resizeMode: 'contain'
                    }}
                    />
                </Grid>
                <Typography size='md' fontFamily='Poppins-Regular' color='tundora' styles={{marginBottom: 10, paddingHorizontal: 5, textAlign: 'center'}}>Para disfrutar de nuestros servicios, debe estar verificado.</Typography>
            </Grid>
            <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log('values login', values)}
            validationSchema={SigninSchema}
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
                <TextField 
                    labelText='Contraseña'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    isError={ errors.password ? true : false}
                    messageError={errors.password}
                    iconRight={<Icon name={(securePass == true) ? 'eyeOffOutline' : 'eyeOutline'} size={18} color='rollingStone' />}
                    onPressIconRight={() => setSecurePass((securePass) ? false: true)}
                    inputProps={{
                    secureTextEntry: securePass
                    }} 
                />
                <Button
                    typeStyle='btn-primary'
                    size='sm'
                    style={{marginTop: 30}}
                >
                    <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                    Iniciar Sesión
                    </Typography>
                </Button>
                <Button
                    size='sm'
                    typeStyle='default'
                    style={{marginTop: 25}}
                >
                    <Typography size='md' fontFamily='Poppins-Medium' color='rhino' styles={{textAlign: 'center', lineHeight: 25}}>Olvidé mi clave</Typography>
                </Button>
                </>
            )}
            </Formik>
        </Grid>
    )
}
