import React, {useState, useEffect, useRef} from 'react';
import {
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Grid} from './Grid';
import {FabIcon} from './FabIcon';
import {OutlinedInput} from './OutlinedInput';
import {Icon} from './Icon';
import {Hr} from './Hr';
import {Button} from './Button';
import {Typography} from './Typography';
import {Alert} from './Alert';
import {LoadIndicatorModal} from './LoadIndicatorModal';
import {
  PlaceAutocomplete,
  PlaceDetails,
  GetPostalPlace,
} from '../utils/googlePlaceApi';
import {Map, MapMarker} from '../components';
import {
  DataLocationGooglePlace,
  ResultSearchGoogleAutocomplete,
} from '../interfaces/googleMap';
import {UbicationOrigin} from '../interfaces/shipment';
export type GoogleAutocompleteModalType = 'origin' | 'destination';

export interface GoogleAutocompleteModal {
  type: GoogleAutocompleteModalType;
  show: boolean;
}
const locationOrigin: UbicationOrigin = {
  postal: '3001',
  place_id: 'ChIJ4Yg5F5Znh44RTQ9zaO0HkwM',
  description: 'Ruezga Norte, Barquisimeto 3001, Lara, Venezuela',
  main_text: 'Ruezga Norte',
  secondary_text: 'Barquisimeto, Lara, Venezuela',
  location: {
    lat: 10.0905194,
    lng: -69.3101029,
  },
};
const origin: MapMarker = {
  image: require('../assets/images/marker-origin-x2.png'),
  coordinate: {
    latitude: locationOrigin.location.lat,
    longitude: locationOrigin.location.lng,
  },
  anchor: { x: 0.8, y: 0.8 },

};

function CloseLocation() {}

interface GoogleAutocompleteProps extends GoogleAutocompleteModal {
  onClose: () => void;
  placeholder: string;
  onSendData: (
    type: GoogleAutocompleteModalType,
    data: DataLocationGooglePlace | null,
  ) => void;
  value: string;
  place_id?: string;
}

const heigthStatusBar = StatusBar.currentHeight;

const checkValueAndFormater = (value: string) => {
  let val: string = value;

  if (val.includes(',')) {
    const arraSplit = val.split(',');
    val = arraSplit[0];
  }

  return val;
};

export const GoogleAutocomplete = ({
  show,
  type,
  onClose,
  onSendData,
  placeholder,
  value,
  place_id,
}: GoogleAutocompleteProps) => {
  const {width} = useWindowDimensions();

  const [valueInput, setValueInput] = useState('');
  const [resultSearch, setResultSearch] = useState<
    ResultSearchGoogleAutocomplete[]
  >([]);
  const [placeId, setPlaceId] = useState('');
  const [dataSend, setDataSend] = useState<DataLocationGooglePlace | null>(
    null,
  );
  const [hideLocatios, setHideLocations] = useState<boolean>(true);
  const [loanding, setLoanding] = useState(false);
  const [msgError, setMsgError] = useState<string | undefined>();
  const [mapMarker, setMapMakers] = useState<MapMarker[]>();
  const [loandingLocation, setLoandingLocation] = useState(false);

  useEffect(() => {
    setValueInput(value);
    setResultSearch([]);
    setPlaceId('');
    setMapMakers([origin]);
    if (value !== '') {
      setValueInput(checkValueAndFormater(value));
      searchPlaceAutocomplete(checkValueAndFormater(value));
      if (place_id && place_id != '') {
        setPlaceId(place_id);
      }
    }
  }, [show]);

  const searchPlaceAutocomplete = async (text: string) => {
    let results: ResultSearchGoogleAutocomplete[] = [];
    setHideLocations(false);
    setLoanding(true);
    setMsgError(undefined);
    //setPlaceId('');

    if (text == '') {
      setTimeout(() => {
        setLoanding(false);
        setResultSearch([]);
      }, 500);
      return;
    }

    const {ok, data, message} = await PlaceAutocomplete(text);

    if (ok) {
      data.map(item => {
        const {
          structured_formatting: {main_text, secondary_text},
          place_id,
          description,
        } = item;

        results.push({main_text, secondary_text, place_id, description});
      });
    }
    console.log('hide locations11', hideLocatios);
    setMsgError(message!);
    setResultSearch(results);
    setLoanding(false);
  };

  const searchPlaceDetails = async (place_id: string) => {
    setHideLocations(true);
    if (place_id === placeId) return;

    setDataSend(null);
    setLoandingLocation(true);
    setMsgError(undefined);

    let dataSend: DataLocationGooglePlace | null = null;

    const {ok, data, message} = await PlaceDetails(place_id);

    if (ok && data !== null) {
      const {
        address_components,
        geometry: {location},
      } = data;

      const postal = GetPostalPlace(address_components);
      const dataAutocomplete = resultSearch.filter(
        item => item.place_id == place_id,
      )[0];

      dataSend = {
        location,
        postal,
        ...dataAutocomplete,
      };

      // Construye el marcador basándote en dataSend
      const newMarker: MapMarker = {
        image: require('../assets/images/marker-origin-x2.png'), // Puedes cambiar la imagen según tus necesidades
        coordinate: {
          latitude: dataSend.location.lat,
          longitude: dataSend.location.lng,
        },
        anchor: {x: 0.8, y: 0.8},
      };

      setMapMakers([newMarker]); // Actualiza el estado con el nuevo marcador
    }

    setTimeout(() => {
      setLoandingLocation(false);
      setMsgError(message!);
      onSendData(type, dataSend);
      setDataSend(dataSend);

      console.log('hide locations22', hideLocatios);
      console.log('set result', resultSearch.length);
    }, 1000);
  };

  return (
    <Modal
      visible={show}
      animationType="fade"
      statusBarTranslucent
      style={{
        flex: 1,
      }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingTop: heigthStatusBar,
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Grid
          paddingHorizontal={15}
          height={56}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <FabIcon
            onPress={() => {
              const data = valueInput != '' ? dataSend : null;
              onSendData(type, data);
              setResultSearch([]);
              onClose();
            }}
            nameIcon="arrowBackOutline"
            shadow={false}
            icon={{
              size: 24,
            }}
            style={{
              borderRadius: 0,
              alignItems: 'flex-start',
              height: '100%',
              width: 30,
            }}
            position={{
              postion: 'relative',
            }}
          />
          <Grid
            width={width - 60}
            display="flex"
            paddingLeft={8}
            paddingTop={8}>
            <OutlinedInput
              bgInput="white"
              value={valueInput}
              onChangeText={value => {
                setValueInput(value);
                searchPlaceAutocomplete(value);
              }}
              labelText={placeholder}
              inputStyle={{
                borderRadius: 0,
                paddingLeft: 0,
                height: 45,
                paddingTop: 10,
              }}
              iconRight={
                valueInput != '' && (
                  <Button
                    onPress={() => {
                      setValueInput('');
                      searchPlaceAutocomplete('');
                    }}>
                    <Icon name="closeOutline" size="lg" color="scorpion" />
                  </Button>
                )
              }
              inputProps={{
                inputMode: 'text',
              }}
            />
          </Grid>
        </Grid>
        <Hr height={20} bg="zumthor" />
        <Grid flex={1} bgColor="white" paddingVertical={20}>
          {!hideLocatios && resultSearch.length !== 0 && !loanding && (
            <ScrollView>
              {resultSearch.map(
                ({main_text, secondary_text, place_id}, index) => (
                  <Button
                    key={index}
                    onPress={() => {
                      setValueInput(main_text);
                      setPlaceId(place_id);
                      searchPlaceDetails(place_id);

                      //onClose();
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      alignItems: 'center',
                      backgroundColor:
                        placeId == place_id ? 'rgba(235, 234, 234, 1)' : '#fff',
                    }}>
                    <Icon
                      name="locationOutline"
                      size={32}
                      style={{
                        color: 'rgba(180,177,177, 0.75)',
                        marginRight: 15,
                      }}
                    />
                    <Grid>
                      <Typography size={13} color="abbey">
                        {main_text}
                      </Typography>
                      <Typography size={11} color="abbey">
                        {secondary_text}
                      </Typography>
                    </Grid>
                  </Button>
                ),
              )}
            </ScrollView>
          )}

          {hideLocatios && resultSearch.length > 0 && !loanding && (
            <Grid>
              <Grid height={'100%'}>
                <Map
                  region={{
                    latitude: dataSend?.location.lat || 10.0905194,
                    longitude: dataSend?.location.lng || -69.3101029,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.015,
                  }}
                  markers={mapMarker}
                />
              </Grid>
            </Grid>
          )}
          {loanding && (
            <Grid flex={1} alignItems="center" justifyContent="center">
              <ActivityIndicator size={38} color="#3292E1" />
            </Grid>
          )}
        </Grid>
        <Alert
          isVisible={msgError !== undefined}
          isAnimated
          position="bottom"
          children={msgError}
          typeBg="error"
          isTypeIcon="error"
          delayAutomatic={6000}
          mh={15}
        />
        <LoadIndicatorModal
          visible={loandingLocation}
          text="Obteniendo información de la ubicación..."
        />

        <Button
          typeStyle="btn-primary"
          size="sm"
          style={{marginBottom: 20}}
          onPress={() => onClose()}>
          <Typography
            color="white"
            fontFamily="Poppins-Medium"
            size={16}
            styles={{
              textTransform: 'uppercase',
              textAlign: 'center',
              lineHeight: 25,
            }}>
            Continuar
          </Typography>
        </Button>
      </KeyboardAvoidingView>
    </Modal>
  );
};
