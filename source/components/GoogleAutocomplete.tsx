import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  useWindowDimensions, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator
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

type GoogleAutocompleteModalType = 'origin' | 'destination'

export interface GoogleAutocompleteModal{
  type: GoogleAutocompleteModalType;
  show: boolean;
}


interface GoogleAutocompleteProps extends GoogleAutocompleteModal{
  onClose: () => void;
  placeholder: string;
  onSendData: (type: GoogleAutocompleteModalType, data: DataLocationGooglePlace | null) => void;
}



export const GoogleAutocomplete = ({
  show,
  type,
  onClose,
  onSendData,
  placeholder
}: GoogleAutocompleteProps) => {
  const { width } = useWindowDimensions();

  const [valueInput, setValueInput] = useState('');
  const [resultSearch, setResultSearch] = useState<ResultSearchGoogleAutocomplete[]>([]);
  const [placeId, setPlaceId] = useState('');
  const [loanding, setLoanding] = useState(true);
  const [msgError, setMsgError] = useState<string | undefined>();


  const [loandingLocation, setLoandingLocation] = useState(false);
  

  useEffect(() => {
    setLoanding(true);
    setTimeout(() => {
      setResultSearch([]);
      setLoanding(false);
    }, 1000);
  }, [type || show])
  
  const searchPlaceAutocomplete  = async(text: string) => {
    setLoanding(true);
    setMsgError(undefined);
    setResultSearch([]);
    setPlaceId(''); 

    if( text == '' ){
      setTimeout(() => {
        setLoanding(false)
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

        setResultSearch(value => ([...value, {main_text, secondary_text, place_id, description}]));
      })

    }

    setMsgError(message!);
    setLoanding(false);
  }

  const searchPlaceDetails = async(place_id: string) => {

    if( place_id === placeId ) return;
    
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
   }, 1000);
  }

  return (
    <Modal
      visible={show} 
      animationType='fade'
      
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1
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
            onPress={onClose}
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
                      <Typography size={11} >{secondary_text}</Typography>
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
        />
        <LoadIndicatorModal 
          visible={loandingLocation}
          text='Obteniendo información de la ubicación...'
        />
      </KeyboardAvoidingView>
    </Modal>
  )
}