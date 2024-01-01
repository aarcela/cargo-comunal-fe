import React from 'react';
import { 
  Button, 
  FabIcon, 
  Grid, 
  Icon, 
  OutlinedInput, 
  Typography,
  SelectInput,
  Alert, 
  LoadIndicatorModal
} from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { Shipment } from '../../client/screens/shipment/Shipment'



export const Confirm = ({ navigation, route }: StackScreenProps<any, any>) => {
  console.log("router info:", route.params?.notificationData)

  
  return (
    <Grid container paddingTop={40} bgColor='white' >

      <Grid display='flex' flex={1} justifyContent='space-between' paddingVertical={20} flexDirection='column' >
        <Typography
          color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}
        >
          {route.params?.notificationData.hora}
        </Typography>
      </Grid>

    </Grid>
  )
}
