import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { User } from '../../interfaces/user/index';
import { 
    Alert,
    Grid, 
    Button, 
    Typography, 
    TextField, 
    Icon, 
    AlertType,
    LoadIndicatorModal
} from '../../components';
import { AuthContext } from '../../context';

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
    const [loanding, setLoanding] = useState(false);
    const [respReq, setrespReq] = useState<{show: boolean, type: AlertType, text: string}>({
        show: false,
        type: 'error',
        text: ''
    });

    const { signIn }  = useContext(AuthContext)

    const onLogin = async(values: { email: string, password: string }) => {
        setLoanding(true)
        console.log('values', values)
        const { ok, message } = await signIn(values.email, values.password);
        console.log(ok, message);
        setrespReq(values => ({
                ...values, 
                show: true, 
                type: ok ? 'success' : 'error', 
                text: ok ? 'Ha iniciado sesion, redireccionando...' : message!
            })
        )
        setLoanding(false)
    }

    return (
        <Grid container isKeyboardAvoidingView KeyboardAvoidingViewProps={{behavior: 'padding'}} bgColor='zircon' justifyContent='center'>
            <LoadIndicatorModal 
                visible={loanding}
                isText={true}
                text='Iniciando sesión...'
                loadIndicatorProps={{
                color: "#fff"
                }}
            />
            <Alert 
                isVisible={respReq.show}
                isAnimated
                position='top'
                top={20}
                typeBg={respReq.type}
                isTypeIcon={respReq.type}
                children={respReq.text}
                mh={15}
                delayAutomatic={4000}
                useStateOpacity={() => setrespReq(values => ({...values, show: false}))}
            />
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
            onSubmit={onLogin}
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
                    onPress={handleSubmit}
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
