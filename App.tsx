import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Grid, Alert, Button, Typography } from './source/components';

const getRandomMessage = () => {
  const number = Math.trunc(Math.random() * 10000);
  return 'Random message ' + number;
};

export const App = () => {
  const [securePass, setSecurePass] = useState(true);
  const [messages, setMessages] = useState<Array<string>>([]);
  const [isVisible, setIsVisible] = useState(false);

  const useStateOpacity = useCallback( () => {
    console.log('asbd djsbdj')
    setIsVisible(false)
    console.log(isVisible)
  }, [isVisible]);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor="transparent" />
      <Grid container bgColor='zircon' justifyContent='center' position='relative'>
          <Alert 
            position='relative'
            isTypeIcon='info' 
            isShowTitle 
            isTypeTxt='info' 
            isAnimated
            useStateOpacity={useStateOpacity}
            isAnimatedAutomatic={false}
            translateYAnimate = {false}
            isVisible={isVisible}  
          >dsdmlsldm</Alert>
        <Button
          size='md'
          typeStyle='btn-light'
          onPress={() => {
            if(isVisible){
              setIsVisible(false)
            }else{
              setIsVisible(true)
            }
          }}
        >
        <Typography size='md' color='abbey' >show o hidden message</Typography>
      </Button>
      </Grid>
    </NavigationContainer>
  )
}
