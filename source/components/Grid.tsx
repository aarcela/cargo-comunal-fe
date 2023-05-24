import React from 'react';
import { Text, View, ViewProps, ViewStyle } from 'react-native';
import { Colors, StylesGlobal } from '../styles';


interface GridProps extends ViewStyle{
    container?: boolean;
    bgColor?: keyof typeof Colors;
    children?: React.ReactNode;
    propsExtras?: ViewProps;
    spacing?: number;
}

export const Grid = (props: GridProps) => {
  return (
    <View
        {...props.propsExtras}
        style={[
            props.container && StylesGlobal.container,
            {...props}
        ]}
    >
     
      { Array.isArray(props.children) ? props.children.map((element, index) => {
          if( props.spacing ){
            return(
              <View
                key={index}
                style={{
                  marginVertical: props.spacing * 5
                }}
              >
                { element }
              </View>
            )
          }

          return element
        }) : props.children
      }
      
    </View>
  )
}
