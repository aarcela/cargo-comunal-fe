import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, PasswordReset, Register } from './screens';
import { ToolBar } from '../components/ToolBar';

const Stack = createStackNavigator();

export const NavigationInit = ( ) => {
  return (
    <Stack.Navigator
      initialRouteName='InitApp'
      screenOptions={{header: (props) => <ToolBar props={props} />}}
    >
      <Stack.Screen name="InitApp" options={{headerShown: false}} component={Home} />
      <Stack.Screen name="Login" options={{title: 'Iniciar sesión'}} component={Login} />
      <Stack.Screen name="Register" options={{title: 'Crear Cuenta'}} component={Register} />
      <Stack.Screen name="PasswordReset" options={{title: 'Recuperar Contraseña'}} component={PasswordReset} />
    </Stack.Navigator>
  );
};

