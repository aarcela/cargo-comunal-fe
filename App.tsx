import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Grid } from './source/components';
import { Image, StatusBar } from 'react-native';
import { CreateUser } from './source/components/user/CreateUser';


export const App = () => {
  const [securePass, setSecurePass] = useState(true);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor="transparent" />
      <Grid flex={1} bgColor='zircon'>
        <CreateUser />
      </Grid>
    </NavigationContainer>
  )
}
