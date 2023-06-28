import React, { useContext, useEffect } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { GPSPermissionsContext } from '../../context/gps';
import { 
  Grid, 
  Typography,
  Button, 
  PermissionLocation,
  Map
} from '../../components';



interface HomeProps extends BottomTabScreenProps<any, any>{};

export const Home = ({ navigation }: HomeProps) => {
  const { permissions, askLocationPermission, changeAttempt, geolocation } = useContext( GPSPermissionsContext );


  
 
  return (
    <Grid flex={1} >
      <PermissionLocation 
        visible={permissions.attempt} 
        onCancel={() => changeAttempt(false)} 
        onAccept={() => askLocationPermission()}
      />
      <Grid position='absolute' width='100%' zIndex={1024} paddingHorizontal={15} bottom={40} right={0}>
        <Button
          typeStyle='btn-primary'
          size='sm'
          onPress={() => navigation.navigate('CreateShipment')}
          activeOpacity={0.90}
        >
          <Typography
            color='white' 
            fontFamily='Poppins-Medium' 
            size='md' 
            styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}
          >
            Solicitar Transporte
          </Typography>
        </Button>
      </Grid>
      <Map 
        region={{
          latitude: geolocation ? geolocation.latitude : 10.48801,
          longitude: geolocation ? geolocation.longitude : -66.87919,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
  
    </Grid>
  )
}
