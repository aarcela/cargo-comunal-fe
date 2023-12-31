import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from './Button';
import { Icon, IconProps } from './Icon';
import { Colors, IoniconsName } from '../styles';

interface FabIconProps{
  onPress?: () => void;
  bgColor?: keyof typeof Colors;
  nameIcon: keyof typeof IoniconsName;
  icon?: IconProps;
  size?: 'md' | 'lg' | 'default' | number;
  position?: {
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
    postion?: 'absolute' | 'relative'
  },
  shadow?: boolean;
  style?: StyleProp<ViewStyle>
}

export const FabIcon = ({
  nameIcon,
  icon,
  bgColor = 'white',
  size = 'default',
  onPress,
  position,
  shadow = true,
  style
}: FabIconProps) => {
  const [sizeBtn, setSizeBtn] = useState(40);

  useEffect(() => {
    if( typeof size == 'number' ){
      setSizeBtn(size)
    }

    switch (size) {
      case 'md':
        setSizeBtn(50)
        break;
      case 'lg':
        setSizeBtn(60)
        break;
      case 'default':
        setSizeBtn(40)
        break;
    }
  }, [size || nameIcon || bgColor])
  
  return (
    <Button
      onPress={onPress}
      bgColor={bgColor}
      activeOpacity={0.85}
      style={[
        {
          height: sizeBtn,
          width: sizeBtn,
          borderRadius: sizeBtn,
          position: position?.postion ? position.postion : 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        position?.bottom ? { bottom: position.bottom } : position?.top ? { top: position.top } : undefined,
        position?.left ? {left: position.left } : position?.right ? { right: position.right } : undefined,
        shadow && {
          shadowColor: 'rgb(0,0,0, 0.80)',
          shadowOffset: {
          width: 15,
          height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 15,
        },
        style
      ]}
    >
      <Icon name={nameIcon} color={icon?.color} size={icon?.size} style={icon?.style} />
    </Button>
  )
}

