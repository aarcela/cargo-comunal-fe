import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp} from 'react-native';
import { Colors, StylesGlobal } from '../styles';

interface ButtonProps  {
  children?: React.ReactNode;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  typeStyle?: 'btn-primary' | 'btn-light';
  borderWidth?: number;
  bgColor?: keyof typeof Colors;
  style?: StyleProp<ViewStyle>;
  touchableOpacityProps?: TouchableOpacityProps;
}

export const Button = ({
  children,
  onPress,
  size = 'md',
  typeStyle,
  borderWidth,
  bgColor,
  style,
  touchableOpacityProps
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
      default:
        setStyles(values => ({ ...values, ...StylesGlobal.btnMd }) )
        break;
    }

    if( typeStyle ){
      switch (typeStyle) {
        case 'btn-light':
          setStyles(values => ({ ...values, ...StylesGlobal.btnLight }) )
          break;
        default:
          setStyles(values => ({ ...values, ...StylesGlobal.btnPrimary }) )
          break;
      }
    }
  }, []);
  

  return (
    <TouchableOpacity
      onPress={onPress}
      {...touchableOpacityProps}
      style={[style,{...styles}, bgColor && { backgroundColor: Colors[bgColor] }, { borderWidth: borderWidth} ]}
    >
      { children }
    </TouchableOpacity>
  )
}
