import React, { useRef, useEffect } from 'react';
import { 
    Modal, 
    Animated, 
    SafeAreaView,
    StyleProp,
    ViewStyle,
    View,
    ActivityIndicator,
    ActivityIndicatorProps,
    useWindowDimensions
} from 'react-native';
import { Typography, TypographyProps } from './Typography';
import { Colors } from '../styles';


interface LoadIndicatorModalProps {
    visible: boolean;
    bgColorModal?: keyof typeof Colors;
    style?: StyleProp<ViewStyle>;
    isIndicator?: boolean;
    loadIndicatorProps?: ActivityIndicatorProps;
    isText?: boolean;
    text?: string;
    textProps?: TypographyProps;
    durationFadeIn?: number;
    duartionFadeOut?: number;
}

export const LoadIndicatorModal = ({
    visible = false,
    bgColorModal,
    style,
    isIndicator = true,
    loadIndicatorProps,
    isText = true,
    text = 'Cargando...',
    textProps,
    duartionFadeOut = 1000,
    durationFadeIn = 1000,

}: LoadIndicatorModalProps) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const { width } = useWindowDimensions();

    useEffect(() => {
      
        if( visible ){
            Animated.timing(opacity, {
                toValue: 1,
                duration: durationFadeIn,
                useNativeDriver: true,
            }).start();
        }else{
            Animated.timing(opacity, {
                toValue: 0,
                duration: duartionFadeOut,
                useNativeDriver: true,
            }).start();
        }
      
    }, [visible])
    

    return (
        <Modal
            visible={visible} 
            statusBarTranslucent 
            transparent 
            animationType='fade'
        >
            <SafeAreaView
                style={[
                    {
                        backgroundColor: bgColorModal ? Colors[bgColorModal] : 'rgba(0,0,0,0.5)',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    style
                ]}
            >
                <Animated.View
                    style={{
                        width: width,
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        opacity: opacity
                    }}
                >
                    {
                        isIndicator &&
                        <ActivityIndicator 
                            size={ loadIndicatorProps?.size ? loadIndicatorProps.size : 48 }
                            color={ loadIndicatorProps?.color ? loadIndicatorProps.color : '#fff' }
                            {...loadIndicatorProps}
                            style={[
                                {
                                    marginBottom: 20
                                },
                                loadIndicatorProps?.style
                            ]}
                        />
                    }
                    {
                        isText &&
                        <Typography
                            color={textProps?.color ? textProps.color : 'white'}
                            {...textProps}
                        >
                            {text}
                        </Typography>
                    }
                </Animated.View>
            </SafeAreaView>
        </Modal>
    )
}
