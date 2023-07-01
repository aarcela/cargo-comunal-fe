import React, { useState, useContext, useEffect, lazy } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { 
  Alert,
  Button,
  Grid,
  Map,
  Modalize, 
  Typography,
  FabIcon,
  CardTruck,
  Icon,
  Hr,
  LoadIndicatorModal,
} from '../../../components';
import { OriginAndDestination, UbicationOriginAndDestination } from '../OriginAndDestination';
import { PaymentMethods } from '../PaymentMethods';
import { GPSPermissionsContext } from '../../../context/gps';
import { UbicationDestination, UbicationOrigin, UbicationShipment } from '../../../interfaces/shipment';




type ItemData = {
  val: number;
  img: any;
  check: boolean;
};

const Trucks : ItemData[] = [
  {
    img: require('../../../assets/images/icon-truck.png'),
    val: 0,
    check: false
  },
  {
    img: require('../../../assets/images/truck-01.png'),
    val: 1,
    check: false
  },
  {
    img: require('../../../assets/images/icon-truck.png'),
    val: 2,
    check: false
  },
  {
    img: require('../../../assets/images/truck-01.png'),
    val: 3,
    check: false
  },
  {
    img: require('../../../assets/images/icon-truck.png'),
    val: 4,
    check: false
  },
  {
    img: require('../../../assets/images/truck-01.png'),
    val: 5,
    check: false
  },
  {
    img: require('../../../assets/images/icon-truck.png'),
    val: 6,
    check: false
  },
  {
    img: require('../../../assets/images/truck-01.png'),
    val: 7,
    check: false
  },
];

interface ConfirmShipmentprops{
  active: boolean;
  goBack: () => void;
  onChangeUbication: (data: UbicationShipment) => void;
  origin?: UbicationOrigin;
  destination?: UbicationDestination;
}

export const ConfirmShipment = ({ 
  active = false,
  goBack,
  origin,
  destination,
  onChangeUbication
}:ConfirmShipmentprops) => {
  const { geolocation } = useContext( GPSPermissionsContext );
  const [msgError, setMsgError] = useState<string | undefined>();
  const [truckSelect, setTruckSelect] = useState<number>();
  const [methodPaymentModal, setMethodPaymentModal] = useState(false);

  const [isLazy, setIsLazy] = useState(active);

  useEffect(() => { 
    
    if( active ){
      setIsLazy(true);
      setTimeout(() => {
        setIsLazy(false);
      }, 1000);
    }else{
      setIsLazy(false);
    }
  
  }, [active])
  


  const renderItem = (item: ItemData) => {
    return (
      <CardTruck
        key={item.val}
        image={{
          source: item.img
        }}
        iconRadio
        checked={{
          check: item.val === truckSelect,
          val: item.val,
          onChangeValue: (val: number) => setTruckSelect(val),
        }}
      />
    );
  };

  return (
    <Grid flex={1} bgColor='white'>
      <LoadIndicatorModal 
        visible={isLazy}
        bgColorModal='white'
        isText={false}
        loadIndicatorProps={{
          color: "#3292E1"
        }}
      />
      {
        !isLazy && active &&
        <Modalize 
        positionInitial='static'
        heightModalize='60%'
        active={active}
        transparent
        radius={false}
        onClose={() => null}
        childrenUp={
          <>
            <Alert 
              isVisible={msgError !== undefined}
              isAnimated
              position='top'
              top={35}
              children={msgError}
              typeBg='error'
              isTypeIcon='error'
              delayAutomatic={6000}
              useStateOpacity={() => setMsgError(undefined)}
              mh={15}
            />
            <FabIcon 
              onPress={goBack}
              nameIcon='arrowBackOutline'
              bgColor='white'
              size='md'
              icon={{
                size: 24
              }}
              position={{
                left: 15,
                top: 35
              }}
            />
            <Grid position='absolute' width='100%' top={'22%'} >
              {
                origin && destination && 
                <Grid paddingHorizontal={15}>
                  <OriginAndDestination
                    bg='white'
                    origin={origin!}
                    destination={destination!}
                    
                    onChangeMap={(type, data) => {
                      if( data == null ){
                        setMsgError(`La ${type == 'origin' ? 'ubicación origen' : 'ubicación destino'} es obligatorio`)
                        return;
                      }

                      if( type == 'origin' ){
                        onChangeUbication({ origin: data, destination: destination!, kmOriginToDestination: null })
                      }else{
                        onChangeUbication({ origin: data, destination: destination!, kmOriginToDestination: null })
                      }
                    }}
                  />
                </Grid>
              }
            </Grid>
          </>
        }
      >
        <Grid position='relative'>
          <PaymentMethods 
            active={methodPaymentModal}
            onConfirm={() => setMethodPaymentModal(false)}
          />
          <ScrollView style={{marginBottom: 140}}>
          {
            Trucks.map(item => {
              return renderItem(item)
            })
          }
          </ScrollView>
          <Grid 
            position='absolute' 
            bottom={0} 
            height={230}
            width='100%' 
            bgColor='white'
            shadowColor='rgb(0,0,0, 0.80)'
            shadowOffset={{
                width: 15,
                height: 10,
            }}
            elevation={14}
            paddingHorizontal={15}
            paddingVertical={10}
          >
            <Button
              style={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
              }}
              onPress={() => setMethodPaymentModal(true)}
            >
              <Grid flexDirection='row' display='flex'>
                <Icon name='walletOutline' size='xl' style={{marginRight: 15}} />
                <Typography color='rollingStone' fontFamily='Poppins-Medium' size='md'>
                  Métodos de pagos
                </Typography>
              </Grid>
              <Icon name='chevronForwardOutline' size='xl' />
            </Button>
            <Hr mb={15} height={2} width='70%' />
            <Button
              typeStyle='btn-primary'
              size='sm'
              onPress={()=> null}
              style={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              
              <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                VIAJAR AHORA
              </Typography>
              <Grid 
                paddingHorizontal={8}
                paddingTop={5}
                paddingBottom={2}
                borderRadius={5}
                bgColor='white'
              >
                <Typography color='success' size='sm'  fontFamily='Poppins-Medium'>$120.00</Typography>
              </Grid>
            </Button>
            <Button
                size='sm'
                typeStyle='default'
                style={{marginTop: 15}}
            >
                <Typography size='md' fontFamily='Poppins-SemiBold' color='rhino' styles={{textAlign: 'center', textTransform: 'uppercase', lineHeight: 25}}>AGENDAR VIAJE</Typography>
            </Button>
          </Grid>
        </Grid>
        
      </Modalize>
      }
      {
        !isLazy && active && 
        <Grid height={'45%'}>
          <Map
            region={{
              latitude: geolocation?.latitude ? geolocation.latitude : 10.48801,
              longitude: geolocation?.longitude ? geolocation.longitude : -66.87919,
              latitudeDelta: 0.010,
              longitudeDelta: 0.015,
            }}
          />
        </Grid>
      }
    </Grid>
  )
}
