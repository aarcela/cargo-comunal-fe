import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { 
  Grid, 
  Map, 
  MapMarker, 
  FabIcon, 
  CardDriver,
  Button, 
  Typography
} from '../../../components'
import { ShipmentContext } from '../../context/shipment';
import { UbicationOrigin } from '../../../interfaces/shipment';
import { DataLocationGooglePlace } from '../../../interfaces/googleMap';
import { StackScreenProps } from '@react-navigation/stack';

function getRegion(origin:any, destination:any, zoom: number) {
  const oLat = Math.abs(origin.latitude);
  const oLng = Math.abs(origin.longitude);
  const dLat = Math.abs(destination.latitude);
  const dLng = Math.abs(destination.longitude);

  return {
      latitude: (origin.latitude + destination.latitude) / 2,
      longitude: (origin.longitude + destination.longitude) / 2,
      latitudeDelta: Math.abs(oLat - dLat) + zoom,
      longitudeDelta: Math.abs(oLng - dLng) + zoom,
  };                                                                                  
}


const locationOrigin : UbicationOrigin = {
  postal: '3001',
  place_id: 'ChIJ4Yg5F5Znh44RTQ9zaO0HkwM',
  description: 'Ruezga Norte, Barquisimeto 3001, Lara, Venezuela',
  main_text: 'Ruezga Norte',
  secondary_text: 'Barquisimeto, Lara, Venezuela',
  location: {
    lat: 10.0905194,
    lng: -69.3101029
  }
  
}

const locationDriver: DataLocationGooglePlace = {
  postal: '3001',
  place_id: 'EkFBdmVuaWRhIEFuZHJlcyBCZWxsbyAmIENhcnJlcmEgMzFBLCBCYXJxdWlzaW1ldG8sIExhcmEsIFZlbmV6dWVsYSJmImQKFAoSCU1ajlKgZ4eOEbeKp4_P8QPFEhQKEglNWo5SoGeHjhG3iqePz_EDxRoUChIJoyRCraFnh44R-xhIcVdQxJoaFAoSCfkpgfugZ4eOEVt99AhqhMZDIgoNGuQBBhWhia_W',
  description: 'Avenida Andres Bello & Carrera 31A, Barquisimeto 3001, Lara, Venezuela',
  main_text: 'Avenida Andres Bello & Carrera 31A',
  secondary_text: 'Barquisimeto, Lara, Venezuela',
  location: {
    lat: 10.0787226,
    lng: -69.3139039
  }
}

const origin:MapMarker = {
  image: require('../../../assets/images/marker-origin-x2.png'),
  coordinate:{
    latitude: locationOrigin.location.lat,
    longitude: locationOrigin.location.lng
  },
  anchor: {x:0.8,y:0.8}
}

const driver: MapMarker = {
  image: require('../../../assets/images/marker-driver-x2.png'),
  coordinate:{
    latitude: locationDriver.location.lat,
    longitude: locationDriver.location.lng
  },
  anchor: {x:1,y:5}
}

const destination: MapMarker = {
  image: require('../../../assets/images/marker-destination-x2.png'),
  coordinate: {
    latitude: 10.081079, 
    longitude: -69.330461
  },
  anchor: {x:1,y:1}
}

const locationsDriverOrigin: Array<{latitude: number, longitude: number}> = [
  {
    latitude: locationDriver.location.lat,
    longitude: locationDriver.location.lng
  },
  {
    latitude: 10.08536288066352,
    longitude: -69.31457600684797
  },
  {
    latitude: 10.090864,
    longitude: -69.313942
  },
  {
    latitude: 10.0905194,
    longitude: -69.3101029
  }
]

const locationsDriverDestination: Array<{latitude: number, longitude: number}> = [
  {
    latitude: 10.090864,
    longitude: -69.313942
  },
  {
    latitude: 10.08536288066352,
    longitude: -69.31457600684797
  },
  {
    latitude: 10.083567, 
    longitude: -69.319477
  },
  {
    latitude: 10.082332, 
    longitude: -69.325336
  },
  {
    latitude: 10.081249, 
    longitude: -69.330501
  },
  {
    latitude: 10.081079, 
    longitude: -69.330461
  }
]


type HistoryDriverCycle = '' | 'point-origin' | 'exit-origin' | 'point-destination';

export const Shipment = ({ navigation }: StackScreenProps<any, any>) => {
  const { shipment } = useContext(ShipmentContext);
  const [mapMakers, setMapMakers] = useState<MapMarker[]>();
  const [ubiOrigin, setUbiOrigin] = useState<MapMarker>();
  const [ubiDestination, setUbiDestination] = useState(origin);
  const [count, setCount] = useState<number>();

  const [showMessageDriver, setShowMessageDriver] = useState(false);
  const [historyCycleDriver, setHistoryCycleDriver] = useState<HistoryDriverCycle>('');

  const [locationsDriver, setLocationsDriver] = useState<Array<{latitude: number, longitude: number}>>(locationsDriverOrigin);
  

  useEffect(() => {
    //setUbiOrigin(driver);
    setMapMakers([origin, driver]);
  }, []);


  const changeLocationDriver = () => {
/*
    
    setCount(setInterval(() =>{
    
      if( mapMakers ){
        let indexCurrent = locationsDriver.findIndex(item => item.latitude == mapMakers![mapMakers!.length - 1].coordinate.latitude);
        console.log(indexCurrent, locationsDriver, locationsDriver.length - 1)
  
        if( indexCurrent !== locationsDriver.length - 1 ){
          let valuesCurrent = mapMakers!;
          valuesCurrent[mapMakers!.length - 1].coordinate = locationsDriver[indexCurrent + 1];
          
  
          if( locationsDriver[indexCurrent + 1].latitude == origin.coordinate.latitude ){
            setShowMessageDriver(true);
            setHistoryCycleDriver('point-origin');
            valuesCurrent[0] = destination;
          }

          if( locationsDriver[indexCurrent + 1].latitude == destination.coordinate.latitude ){
            setShowMessageDriver(true);
            setHistoryCycleDriver('point-destination');
          }
  
        
  
          setMapMakers([]);
          setMapMakers(valuesCurrent);
        
        }
      }
    }, 5000) )
      */
    
  }

  const clearChangeLocation = () => {
    if( count ){
      clearInterval(count);
    }
  }
  return (
    <Grid bgColor='white' flex={1}>
      <FabIcon 
        onPress={() => {
          if(  historyCycleDriver == 'point-origin' ){
            setShowMessageDriver(true);
            setHistoryCycleDriver('exit-origin');
            setTimeout(() => {
              setShowMessageDriver(false);
            }, 3000);
          }

          changeLocationDriver();
        }}
        nameIcon='refresh'
        icon={{size: 'xl'}}
        position={{
          top: 45,
          left: '45%',
          postion: 'absolute'
        }}
        style={{zIndex: 1024}}
      />
      {
        shipment !== null &&
        <Grid position='absolute' paddingHorizontal={15} left={0} width='100%' bottom={15} zIndex={1024}>
        <CardDriver 
          text={{
            title: `${shipment!.driver.first_name} ${shipment!.driver.first_surname}`,
            subTitle: shipment!.driver.email
          }}
          image={{
            source: require('../../../assets/images/avatar-x2.png')
          }}
          styleCardBody={{ borderTopLeftRadius: 5, borderTopRightRadius: 5}}
          styleAccordBody={{ paddingHorizontal: 15, paddingBottom: 20 }}
          expanded={showMessageDriver}
        >
          <Grid display='flex' alignItems='center'>
            <Typography fontFamily='Poppins-Medium' size='lg' styles={{textAlign: 'center', lineHeight: 25, marginBottom: 20}}>
              {
                historyCycleDriver == 'point-origin' && 'El conductor ha llegado a el punto de origen'
              }
              {
                historyCycleDriver == 'exit-origin' && 'El conductor está saliendo del punto de origen al destino.'
              }
              {
                historyCycleDriver == 'point-destination' && 'El conductor llego a el punto destino'
              }
            </Typography>
            <Button
              onPress={() => { 
                if( historyCycleDriver == 'point-origin' ){
                  clearChangeLocation();
                  setLocationsDriver([]);
                  setLocationsDriver(locationsDriverDestination);
                }

                if( historyCycleDriver == 'point-destination' ){
                  clearChangeLocation();
                  setTimeout(() => {
                    navigation.navigate('InvoiceShipment');
                  }, 1000);
                }

                setShowMessageDriver(false);
               
              }}
              bgColor='curiousBlue'
              style={{paddingVertical: 10, paddingHorizontal: 15}}
            >
              <Typography color='white' fontFamily='Poppins-Medium' size='md' styles={{textAlign: 'center', lineHeight: 25}}>
               {
                historyCycleDriver == 'point-origin' || historyCycleDriver == 'exit-origin' ?
                'Aceptar' : 'Cerrar viaje'
               }
              </Typography>
            </Button>
          </Grid>
        </CardDriver>
        <CardDriver 
          text={{
            title: 'Ford F-50',
            subTitle: 'Peso máximo: 1 tn'
          }}
          textsecondary={{
            title: 'Placa: A49AY1L',
            subTitle: 'Color gris'
          }}
          image={{
            source: require('../../../assets/images/icon-truck.png')
          }}
          styleCardBody={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
        />
        
      </Grid>
      }
      <Map
        region={getRegion(driver.coordinate, origin.coordinate, 0.008)}
        markers={mapMakers}
       
      />
    </Grid>
  )
}

/**
 * 
 *  mapDirections={{
          apikey: 'AIzaSyBUZ03r1DEZFngHDNz6aIQTO1dFXP7rPaQ',
          origin: {
            latitude: ubiOrigin!.coordinate.latitude,
            longitude: ubiOrigin!.coordinate.longitude
          },
          destination: {
            latitude: ubiDestination.coordinate.latitude,
            longitude: ubiDestination.coordinate.longitude
          },
          strokeWidth:4,
          strokeColor:Colors.curiousBlue
        }}
 */
