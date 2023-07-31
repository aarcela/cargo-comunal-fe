import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, Modal, StatusBar, View, StyleProp, ViewStyle } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  Extrapolate,
  interpolate,
  runOnJS
} from 'react-native-reanimated';

type HeightModalizeType = '30%' | '40%' | '50%' | '60%' | '70%' | '100%';
type ModalizeProps = {
    heightModalize: HeightModalizeType;
    active: boolean;
    onClose: () => void;
    radius?: boolean;
    transparent?: boolean;
    positionInitial?: 'static' | 'flexible';
    children: React.ReactNode;
    childrenUp?:  React.ReactNode;
}

const HeightModalize = (val: HeightModalizeType) => {
    "worklet";
    switch (val) {
        case '30%':
            return 0.30;
        case '40%':
            return 0.40;
        case '50%':
            return 0.50;
        case '60%':
            return 0.60;
        case '70%':
            return 0.70;
        case '100%':
            return 1;
    }
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 25;

export const Modalize = ({
    heightModalize = '50%',
    active,
    onClose,
    radius = true,
    transparent = false,
    positionInitial = 'flexible',
    children,
    childrenUp
}: ModalizeProps) => {
    const [heightContainer, setHeightContainer] = useState(0);
    const { height } = useWindowDimensions();
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
   

    const scrollTo = (destination: number) => {
        "worklet";
        translateY.value = withSpring(destination, {damping: 50})
    };

    const close = () => {
        "worklet";
        runOnJS(onClose)();
    }

    useEffect(() => {
        if( active ){
            const pHeight = HeightModalize(heightModalize);
            scrollTo(-height * pHeight);
        }
    }, [active])

    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y : translateY.value }
    }).onUpdate((event) => {
        
        if( event.translationY < 0 ){
            const y = (heightContainer - statusBarHeight) + (translateY.value + event.translationY);
            
            if( y  >= 0 ){
                translateY.value = event.translationY + context.value.y;
            }
            
        }else{
            if( positionInitial == 'flexible' ){
                translateY.value = event.translationY + context.value.y;
            }else{
                const heightInit = -height * HeightModalize(heightModalize);
                const y = translateY.value + event.translationY;
                
                if( heightInit > y )
                 translateY.value = event.translationY + context.value.y;
                
            }
            
        }
        
    })
    .onEnd((e) => {
        if( e.translationY > 0 ){
            const y = -(translateY.value);
            
            if( y <= heightContainer * 0.15 ){
                scrollTo(0);
                close()
            }else{
                
                const heightInit = -height * HeightModalize(heightModalize);
                if( heightInit < translateY.value && positionInitial == 'flexible')
                    scrollTo(translateY.value + 20)

                if( positionInitial == 'flexible' ){
                    scrollTo(translateY.value + 20)
                }else{
                    const heightInit = -height * HeightModalize(heightModalize);
                    
                    scrollTo(heightInit);
                }
                
            }
        }else{
            const y = - (translateY.value);
            if( y > heightContainer * 0.85 ){
                scrollTo(translateY.value - ( (heightContainer - statusBarHeight) - y ))
            }else{
                scrollTo(translateY.value - 20)
            }
            
        }

    });

    const animatedStyle = useAnimatedStyle( () => {
        const borderRadius = interpolate(
          translateY.value,
          [(-heightContainer + statusBarHeight) + 20, (-heightContainer + statusBarHeight) + 10],
          [20, 0],
          Extrapolate.CLAMP
        );
        
        const h = translateY.value < 0 ? -(translateY.value) : translateY.value;
    
        return {
          borderTopEndRadius: radius ? borderRadius : 0,
          borderTopStartRadius: radius ? borderRadius : 0,
          height: h,
          transform: [{translateY: translateY.value}],
        }
    });
    
    return (
        <Modal 
            visible={active} 
            statusBarTranslucent 
            transparent 
            animationType='fade'
        >
            <GestureHandlerRootView 
                style={{
                    backgroundColor: transparent ? 'transparent' :'rgba(0,0,0,0.15)' ,
                    flex: 1,
                }} 
                onLayout={(e) => setHeightContainer(e.nativeEvent.layout.height) }
            >
                { childrenUp }
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        style={[
                            styles.containerModalize,
                            animatedStyle,
                            {
                                //height: heightContainer * HeightModalize(heightModalize),
                                top: heightContainer,
                            },
                        
                        ]}
                    >
                        <View style={styles.line}  />
                        {children}
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView> 
        </Modal>
    
    )
}


const styles = StyleSheet.create({
    containerModalize: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        shadowColor: 'rgb(0,0,0, 0.80)',
        shadowOffset: {
        width: 15,
        height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 15,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    }
})