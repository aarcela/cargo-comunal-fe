import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Modalize } from './Modalize';

interface GoogleAutocompleteProps{
  show: boolean;
  onClose: () => void;
  placeholder: string;
}

export const GoogleAutocomplete = ({
  show,
  onClose
}: GoogleAutocompleteProps) => {
  return (
    <Modalize
      active={show}
      onClose={onClose}
      heightModalize='70%'
    >
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'YOUR API KEY',
          language: 'en',
        }}
      />
    </Modalize>
  )
}
