import React from 'react';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';
import { OutlinedInput, OutlinedInputProps } from './OutlinedInput';


interface SelectInputPros extends OutlinedInputProps{
    select: {
        value: any;
        items: Item[];
        placeholder?: Item;
        style?: PickerStyle;
    }
}

export const SelectInput = ({
    labelText, 
    labelColorText = 'scorpion', 
    value, 
    onChangeText,
    inputStyle,
    inputProps,
    isError,
    messageError = '',
    onPressIconRight,
    iconRight,
    mb = 8,
    bgInput,
    inputOnButton,
    select
}: SelectInputPros) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => {
        const items = select.items;
        const item = items.filter(val => value === val.value)[0];
        
        onChangeText({label: item.label, value: item.value});
      }}
      value={select.value}
      placeholder={{
        label: select.placeholder?.label,
        value: select.placeholder?.value,
        color: select.placeholder?.color || '#C6C6C6',
        inputLabel: select.placeholder?.inputLabel,
        key: select.placeholder?.key
      }}
      style={{
        
      }}
      items={select.items}
    >
      <OutlinedInput
         labelText={labelText}
         labelColorText = {labelColorText}
         value={value} 
         onChangeText={onChangeText}
         inputStyle={inputStyle}
         inputProps={inputProps}
         isError={isError}
         messageError={messageError}
         onPressIconRight={onPressIconRight}
         iconRight={iconRight}
         mb={mb}
         bgInput={bgInput}
      />
    </RNPickerSelect>
  )
}
