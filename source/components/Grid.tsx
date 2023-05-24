import React from 'react';
import { View, ViewProps, ViewStyle, KeyboardAvoidingView, KeyboardAvoidingViewProps } from 'react-native';
import { Colors, StylesGlobal } from '../styles';


interface GridProps extends ViewStyle{
  container?: boolean;
  bgColor?: keyof typeof Colors;
  children?: React.ReactNode;
  propsExtras?: ViewProps;
  spacing?: number;
  isKeyboardAvoidingView?: boolean;
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
}

export const Grid = (props: GridProps) => {


  if( props.isKeyboardAvoidingView && props.isKeyboardAvoidingView ){
    return(
      <KeyboardAvoidingView 
        {...props.KeyboardAvoidingViewProps}
        style={[
          props.container && StylesGlobal.container,
          {...props},
          props.bgColor && { backgroundColor: Colors[props.bgColor] }
        ]}
      >
        { ChildrenGrid(props.children, props.spacing) }
      </KeyboardAvoidingView>
    )
  }

  return (
    <View
        {...props.propsExtras}
        style={[
            props.container && StylesGlobal.container,
            {...props}
        ]}
    >
     { ChildrenGrid(props.children, props.spacing) }
    </View>
  )
}

const ChildrenGrid = (children?: React.ReactNode , spacing?: number  ) => {

  if( Array.isArray(children) ){
    children.map((element, index) => {
      if( spacing ){
        return(
          <View
            key={index}
            style={{
              marginVertical: spacing * 5
            }}
          >
            { element }
          </View>
        )
      }
  
      return element
    })
  }
  
  return children
};
