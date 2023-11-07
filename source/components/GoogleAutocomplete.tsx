import React, { useState, useEffect, useRef } from 'react';
import { 
  Modal, 
  useWindowDimensions, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Grid } from './Grid';
import { FabIcon } from './FabIcon';
import { OutlinedInput } from './OutlinedInput';
import { Icon } from './Icon';
import { Hr } from './Hr';
import { Button } from './Button';
import { Typography } from './Typography';
import { Alert } from './Alert';
import { LoadIndicatorModal } from './LoadIndicatorModal';
import { 
  PlaceAutocomplete,
  PlaceDetails,
  GetPostalPlace 
} from '../utils/googlePlaceApi';
import { DataLocationGooglePlace, ResultSearchGoogleAutocomplete } from '../interfaces/googleMap';

export type GoogleAutocompleteModalType = 'origin' | 'destination'

export interface GoogleAutocompleteModal{
  type: GoogleAutocompleteModalType;
  show: boolean;
}


interface GoogleAutocompleteProps extends GoogleAutocompleteModal{
  onClose: () => void;
  placeholder: string;
  onSendData: (type: GoogleAutocompleteModalType, data: DataLocationGooglePlace | null) => void;
  value: string;
  place_id?: string;
}


const heigthStatusBar = StatusBar.currentHeight;


const checkValueAndFormater = (value: string) => {
  let val: string = value;

  if( val.includes(',') ){
    const arraSplit = val.split(',');
    val = arraSplit[0];
  }

  return val;
}

export const GoogleAutocomplete = ({
  show,
  type,
  onClose,
  onSendData,
  placeholder,
  value,
  place_id
}: GoogleAutocompleteProps) => {
  const { width } = useWindowDimensions();

  const [valueInput, setValueInput] = useState('');
  const [resultSearch, setResultSearch] = useState<ResultSearchGoogleAutocomplete[]>([]);
  const [placeId, setPlaceId] = useState('');
  const [dataSend, setDataSend] = useState<DataLocationGooglePlace | null>(null);

  const [loanding, setLoanding] = useState(false);
  const [msgError, setMsgError] = useState<string | undefined>();


  const [loandingLocation, setLoandingLocation] = useState(false);
  

  useEffect(() => {
    setValueInput(value);
    setResultSearch([]);
    setPlaceId('');

    if( value !== '' ){
      setValueInput(checkValueAndFormater(value));
      searchPlaceAutocomplete(checkValueAndFormater(value));
      if( place_id && place_id != ''  ){
        setPlaceId(place_id);
      }
      
    }
  }, [show])
  
  const searchPlaceAutocomplete  = async(text: string) => {
    let results: ResultSearchGoogleAutocomplete[] = [];
    
    setLoanding(true);
    setMsgError(undefined);
    //setPlaceId('');
    

    if( text == '' ){
      setTimeout(() => {
        setLoanding(false);
        setResultSearch([]);
        
      }, 500);
      return;
    } 


    const { ok, data, message } = await PlaceAutocomplete(text);
  
   
    if( ok ){
      

      data.map(item => {
        const {  
          structured_formatting: { main_text, secondary_text }, 
          place_id,
          description 
        } = item;

      
        results.push({main_text, secondary_text, place_id, description});
      })

    }

    setMsgError(message!);
    setResultSearch(results);
    setLoanding(false);
  }

  const searchPlaceDetails = async(place_id: string) => {

    if( place_id === placeId ) return;
    
    setDataSend(null); 
    setLoandingLocation(true);
    setMsgError(undefined);

    let dataSend:DataLocationGooglePlace | null = null;

    const { ok, data, message } = await PlaceDetails(place_id);

    if( ok && data !== null){
      const { 
        address_components, 
        geometry: { location }  
      } = data;

      const postal = GetPostalPlace(address_components);
      const dataAutocomplete = resultSearch.filter(item => item.place_id == place_id)[0];

      dataSend = {
        location,
        postal,
        ...dataAutocomplete
      };
      
    }
    

   setTimeout(() => {
    setLoandingLocation(false);
    setMsgError(message!);
    onSendData(type, dataSend);
    setDataSend(dataSend)
   }, 1000);
  }

  return (
    <Modal
      visible={show} 
      animationType='fade'
      statusBarTranslucent
      style={{
        flex: 1,
      }}
    >           
      
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingTop: heigthStatusBar,
        }}
        behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
      >
        <Grid
          paddingHorizontal={15}
          height={56}
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <FabIcon
            onPress={() => {
              const data = valueInput != '' ? dataSend : null;
              onSendData(type, data);
              setResultSearch([]);
              onClose();

            }}
            nameIcon='arrowBackOutline'
            shadow={false}
            icon={{
              size: 24
            }}
            style={{
              borderRadius: 0,
              alignItems: 'flex-start',
              height: '100%',
              width: 30
            }}
            position={{
              postion: 'relative'
            }}
          />
          <Grid width={width - 60} display='flex' paddingLeft={8} paddingTop={8}>
            <OutlinedInput 
              bgInput='white'
              value={valueInput}
              onChangeText={(value) => {
                setValueInput(value)
                searchPlaceAutocomplete(value)
              }}
              labelText={placeholder}
              inputStyle={{
                  borderRadius:0,
                  paddingLeft: 0,
                height: 45,
                  paddingTop: 10,
              }}
              iconRight={
                valueInput != '' && 
                <Button onPress={() => {
                  setValueInput('');
                  searchPlaceAutocomplete('');
                }}>
                  <Icon name='closeOutline' size='lg' color='scorpion' />
                </Button>
              }
              inputProps={{
                inputMode: 'text',
              }}
            />
          </Grid>
        </Grid>
        <Hr height={20} bg='zumthor' />
        <Grid flex={1} bgColor='white' paddingVertical={20}>
          {
            resultSearch.length !== 0 && !loanding &&
            <ScrollView >
              {
                resultSearch.map(({ main_text, secondary_text, place_id }, index) => (
                  <Button
                    key={index}
                    onPress={() => {
                      setValueInput(main_text)
                      setPlaceId(place_id)
                      searchPlaceDetails(place_id)
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      alignItems: 'center',
                      backgroundColor: placeId == place_id ? 'rgba(235, 234, 234, 1)' : '#fff'
                    }}
                  >
                    <Icon name='locationOutline' size={32} style={{color: 'rgba(180,177,177, 0.75)', marginRight: 15}}  />
                    <Grid>
                      <Typography size={13} color='abbey'>{main_text}</Typography>
                      <Typography size={11} color='abbey'>{secondary_text}</Typography>
                    </Grid>
                </Button>

                ))
              }
            </ScrollView>
          }
          {
          resultSearch.length == 0 && !loanding &&
            <Grid
              flex={1}
              alignItems='center'
              justifyContent='center'
            >
              <Icon name='globeOutline' size={38} style={{opacity: 0.35}} />
            </Grid>
          }
          {
            loanding && 
            <Grid
              flex={1}
              alignItems='center'
              justifyContent='center'
            >
              <ActivityIndicator 
                size={38}
                color='#3292E1'
              />
            </Grid>
          }
        </Grid>
        <Alert 
          isVisible={msgError !== undefined}
          isAnimated
          position='bottom'
          children={msgError}
          typeBg='error'
          isTypeIcon='error'
          delayAutomatic={6000}
          mh={15}
        />
        <LoadIndicatorModal 
          visible={loandingLocation}
          text='Obteniendo información de la ubicación...'
        />
      </KeyboardAvoidingView>
    </Modal>
  )
}
