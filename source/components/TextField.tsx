import React, { useState } from 'react';
import { TextInput, TextInputProps, ViewStyle, StyleProp, TouchableOpacity as Button } from 'react-native';
import { Typography, TypographyPros, Grid, Icon } from './';
import { Colors } from '../styles';

export interface TextFiedProps{
    labelText?: string;
    labelTextProps?: TypographyPros;
    value: any;
    onChangeText: (field : string) => void;
    inputProps?: TextInputProps;
    inputStyle?: StyleProp<ViewStyle>;
    isTextField?: boolean;
    isError?: boolean;
    messageError?: string;
    onPressIconRight?: () => void;
    iconRight?: React.ReactNode;
    children?: React.ReactNode;
}

export const TextField = ({
    labelText, 
    labelTextProps, 
    value, 
    onChangeText, 
    inputProps, 
    isTextField = true, 
    inputStyle,
    isError,
    messageError = '',
    onPressIconRight,
    iconRight,
    children
}: TextFiedProps) => {
    const [isFocus, setisFocus] = useState(false);

    return (
        <Grid marginTop={10} width='100%'>
            {labelText && <Typography size='sm' fontFamily='Poppins-Medium' color='scorpion' textProps={{numberOfLines:2}} styles={{...labelTextProps?.styles}}>{labelText}</Typography> }
            <Grid position='relative' marginBottom={8}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    autoCapitalize='none'
                    onFocus={() => setisFocus(true)}
                    onBlur={() => setisFocus( value != '' ? true : false)}
                    style={[ isTextField && {
                        height: 30,
                        backgroundColor: 'transparent',
                        borderBottomColor: isFocus ? Colors.treePoppy : isError ? Colors.error : Colors.silver,
                        borderBottomWidth: 1,
                        paddingBottom: 0,
                        paddingHorizontal: 0,
                        paddingRight: iconRight ? 35 : 0,
                        paddingTop: 0
                    }, inputStyle, { fontSize: 12 , fontFamily: 'Poppins-Light', color: Colors.rollingStone, lineHeight: 20 } ]}
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
                {children}
            </Grid>
            { isError && <Typography size={11} fontFamily='Poppins-Medium' color='error'>{messageError}</Typography> }
        </Grid>
    )
}
