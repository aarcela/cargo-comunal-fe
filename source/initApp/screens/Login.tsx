import React, {useState, useContext} from 'react';
import {Image, View} from 'react-native';
import {Formik, getIn} from 'formik';
import * as Yup from 'yup';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Alert,
  Grid,
  Button,
  Typography,
  TextField,
  Icon,
  AlertType,
  LoadIndicatorModal,
} from '../../components';
import {AuthContext} from '../../context';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('correo electrónico no valido')
    .required('correo electrónico'),
  password: Yup.string()
    .min(6, 'Minimo 6 caracteres')
    .max(10, 'Maximo, 12 caracteres')
    .required('Contraseña requerido'),
});

export const Login = ({navigation}: StackScreenProps<any, any>) => {
  const [securePass, setSecurePass] = useState(true);
  const [loanding, setLoanding] = useState(false);
  const [respReq, setrespReq] = useState<{
    show: boolean;
    type: AlertType;
    text: string;
  }>({
    show: false,
    type: 'error',
    text: '',
  });

  const {signIn, FCM, saveTokenFCM} = useContext(AuthContext);

  const onLogin = async (values: {email: string; password: string}) => {
    setLoanding(true);
    console.log('values:', values);
    const {ok, message, id_user} = await signIn(values.email, values.password);

    const {status} = await saveTokenFCM(id_user, FCM);

    setrespReq(values => ({
      ...values,
      show: true,
      type: ok ? 'success' : 'error',
      text: ok ? 'Ha iniciado sesion, redireccionando...' : message!,
    }));
    setLoanding(false);
  };

  return (
    <Grid
      container
      isKeyboardAvoidingView
      KeyboardAvoidingViewProps={{behavior: 'padding'}}
      bgColor="zircon"
      >
      <LoadIndicatorModal
        visible={loanding}
        isText={true}
        text="Iniciando sesión..."
        loadIndicatorProps={{
          color: '#fff',
        }}
      />
      <Alert
        isVisible={respReq.show}
        isAnimated
        position="top"
        top={20}
        typeBg={respReq.type}
        isTypeIcon={respReq.type}
        children={respReq.text}
        mh={15}
        delayAutomatic={4000}
        useStateOpacity={() => setrespReq(values => ({...values, show: false}))}
      />
      <Grid alignItems="center" justifyContent="center">
        <Grid>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              maxHeight: '70%',
              maxWidth: '100%',
              resizeMode: 'contain',
            }}
          />
        </Grid>
        <Typography
          size="md"
          fontFamily="Poppins-Regular"
          color="tundora"
          styles={{
            marginBottom: 10,
            paddingHorizontal: 5,
            textAlign: 'center',
          }}>
          Ingresa tus datos para iniciar sesión
        </Typography>
        {/* <TextField 
                    labelText='TOKEN'
                    value={FCM}
                    onChangeText={()=>{}}
                    inputProps={{
                        keyboardType: 'email-address'
                    }}
                    
                    
                    iconRight={<Icon name='mailOutline' size='lg' color='rollingStone' />} 
                /> */}
      </Grid>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={onLogin}
        validationSchema={SigninSchema}>
        {({handleChange, handleBlur,setFieldValue, setFieldTouched, handleSubmit, values, errors}) => (
          <View>
            <TextField
              labelText="Correo electrónico"
              value={getIn(values.email, 'email')}
              onChangeText={(val) => {
                setFieldValue('email', val)
                setFieldTouched('email', true, false)}}
              inputProps={{
                keyboardType: 'email-address',
              }}
              isError={errors.email ? true : false}
              messageError={errors.email}
              iconRight={
                <Icon name="mailOutline" size="lg" color="rollingStone" />
              }
            />
            <TextField
              labelText="Contraseña"
              value={getIn(values.password,'password')}
              onChangeText={handleChange('password')}
              isError={errors.password ? true : false}
              messageError={errors.password}
              iconRight={
                <Icon
                  name={securePass == true ? 'eyeOffOutline' : 'eyeOutline'}
                  size={18}
                  color="rollingStone"
                />
              }
              onPressIconRight={() => setSecurePass(securePass ? false : true)}
              inputProps={{
                secureTextEntry: securePass,
              }}
            />
            <Button
              typeStyle="btn-primary"
              size="sm"
              style={{marginTop: 30}}
              onPress={handleSubmit}>
              <Typography
                color="white"
                fontFamily="Poppins-Medium"
                size={16}
                styles={{
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 25,
                }}>
                Iniciar Sesión
              </Typography>
            </Button>
            {/* <Button
              size="sm"
              typeStyle="default"
              style={{marginTop: 25}}
              onPress={() => navigation.navigate('PasswordReset')}>
              <Typography
                size="md"
                fontFamily="Poppins-Medium"
                color="rhino"
                styles={{textAlign: 'center', lineHeight: 25}}>
                Olvidé mi clave
              </Typography>
            </Button> */}
          </View>
        )}
      </Formik>
    </Grid>
  );
};
