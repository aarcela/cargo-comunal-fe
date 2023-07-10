import React, { useEffect, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack'
import { Grid, FabIcon } from '../../../components';
import { ShipmentContext } from '../../context';


export const Invoice = ({ navigation }: StackScreenProps<any, any>) => {
  const { onDestrontyShipment } = useContext(ShipmentContext);

  useEffect(() => {
    onDestrontyShipment();
  }, [])
  
  return (
    <Grid bgColor='white' container paddingTop={56}>
      <FabIcon 
        onPress={() => navigation.navigate('NavBottomTab')}
        nameIcon='arrowBackOutline'
        icon={{
          size: 'lg'
        }}
        position={{
          postion: 'relative'
        }}
      />
    </Grid>
  )
}
