import React from 'react';
import { 
  TextInput, 
  TextInputProps, 
  ViewStyle, 
  StyleProp, 
  TouchableOpacity as Button, 
  StyleSheet 
} from 'react-native';
import { Typography } from './Typography';
import { Grid } from './Grid';
import { Colors } from '../styles';
import { Icon } from './Icon';

export interface ItemValue {
  label: string;
  value: any;
}

export type OutlinedInputProps = {
  labelText?: string;
  labelColorText?:  keyof typeof Colors;
  value: any;
  onChangeText: (val : any) => void;
  inputStyle?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
  isError?: boolean;
  messageError?: string;
  onPressIconRight?: () => void;
  iconRight?: React.ReactNode;
  mb?: number;
  bgInput?: keyof typeof Colors;
  inputOnButton?: () => void;
}

export const OutlinedInput = ({
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
  inputOnButton
}:OutlinedInputProps) => {
  
  return (
    <Grid>
      <Grid position='relative' marginBottom={mb}>
        {
          inputOnButton && 
            <Button 
            onPress={inputOnButton}
            activeOpacity={1}
            style={[
              {
                position: 'absolute',
                bottom: 0,
                height: styles.defaultStyle.height,
                backgroundColor: 'transparent',
                width:'100%',
                zIndex: 1024,
              },
              inputStyle
            ]}
          />
        }
        <TextInput 
          onChangeText={onChangeText}
          value={value}
          autoCapitalize='none'
          style={[styles.defaultStyle, inputStyle, { paddingRight: iconRight ? 35 : 10 }, { backgroundColor: bgInput ? Colors[bgInput] : 'transparent' }]}
          placeholder={labelText}
          placeholderTextColor={Colors[labelColorText]}
          {...inputProps}
        />
        { iconRight &&
          <Button
            onPress={isError ? undefined : onPressIconRight}
            activeOpacity={0.65}
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              width: 35,
              height: '100%',
              zIndex: 1024,      
              right: 0,
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            { isError ? (
              <Icon name='alertCircleOutline' size='lg' color='error' />
            ) :  iconRight }
          </Button>
        }
      </Grid>
      { isError && <Typography size={11} fontFamily='Poppins-Medium' color='error'>{messageError}</Typography> }
    </Grid>
  )
}

const styles = StyleSheet.create({
  defaultStyle:{
    height: 55,
    paddingLeft: 15,
    paddingTop: 12,    
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    alignItems: 'center',
    display: 'flex',
    textAlignVertical: 'center',
    paddingBottom: 8,
    borderRadius: 5
  }
})
