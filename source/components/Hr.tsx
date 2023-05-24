import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors } from '../styles';

interface Props {
    height?: number;
    width?: number | string;
    bg?: keyof typeof Colors;
    mt?: number;
    mb?: number;
    style?: ViewStyle;
}

export const Hr = ( { height = 1, width = '100%', bg = 'gallery', mt = 0, mb = 0, style } : Props ) => {
  return (
    <View style={{ height: height, backgroundColor: Colors[bg], marginTop: mt, marginBottom: mb, width: width, ...style }} />
  )
}