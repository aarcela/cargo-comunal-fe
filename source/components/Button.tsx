import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp} from 'react-native';
import { Colors, StylesGlobal } from '../styles';

interface ButtonProps  {
  children?: React.ReactNode;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'default';
  typeStyle?: 'btn-primary' | 'btn-light' | 'default';
  borderWidth?: number;
  bgColor?: keyof typeof Colors;
  style?: StyleProp<ViewStyle>;
  touchableOpacityProps?: TouchableOpacityProps;
  activeOpacity?: number;
}

export const Button = ({
  children,
  onPress,
  size = 'default',
  typeStyle = 'default',
  borderWidth,
  bgColor,
  style,
  touchableOpacityProps,
  activeOpacity = 0.75
}: ButtonProps) => {
  const [styles, setStyles] = useState({})

  useEffect(() => {
    switch (size) {
      case 'sm':
        setStyles(values => ({ ...values, ...StylesGlobal.btnSm }) )
        break;
      case 'lg':
        setStyles(values => ({ ...values, ...StylesGlobal.btnLg }) )
        break;
      case 'md':
        setStyles(values => ({ ...values, ...StylesGlobal.btnMd }) )
        break;
      default:
        break;
    }



    if( typeStyle ){
      switch (typeStyle) {
        case 'btn-light':
          setStyles(values => ({ ...values, ...StylesGlobal.btnLight }) )
          break;
        case 'btn-primary': 
          setStyles(values => ({ ...values, ...StylesGlobal.btnPrimary }) )
          break;
        default:
          break;
      }
    }
  }, [size || typeStyle]);
  

  return (
    <TouchableOpacity
      onPress={onPress}
      {...touchableOpacityProps}
      activeOpacity={activeOpacity}
      style={[style,{...styles}, bgColor && { backgroundColor: Colors[bgColor] }, { borderWidth: borderWidth} ]}
    >
      { children }
    </TouchableOpacity>
  )
}
