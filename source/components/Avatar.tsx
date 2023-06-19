import React from 'react';
import { ViewStyle } from 'react-native';
import { Grid } from './Grid';
import { Typography, TypographyProps } from './Typography';

interface AvatarProps {
  width: number;
  height: number;
  radius: number;
  typeAvatar?: 'txt' | 'img';
  labelAvatar: string;
  labelProps?: TypographyProps;
  stylesAvatar?: ViewStyle;
}

export const Avatar = ({
  width,
  height,
  radius,
  typeAvatar = 'txt',
  labelAvatar,
  stylesAvatar,
  labelProps
}: AvatarProps) => {
  return (
    <Grid 
      height={height} 
      alignItems='center' 
      justifyContent='center' 
      width={width} 
      borderRadius={radius} 
      bgColor='zumthor'
      {...stylesAvatar} 
    >
      <Typography
        fontFamily='Poppins-Regular' 
        color='rollingStone'
        size='md'
        styles={{ textAlignVertical: 'center', textTransform: 'uppercase', ...labelProps?.styles }}
        {...labelProps}
      >
        {labelAvatar}
      </Typography>
    </Grid>
  )
}
