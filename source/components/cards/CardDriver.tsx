import React, { useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    ImageProps, 
    Image, 
    StyleProp, 
    ViewStyle,
    Platform,
    UIManager,
    LayoutAnimation 
} from 'react-native';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Icon } from '../Icon';

interface CardDriverProps {
    image?: ImageProps;
    text:{
        title: string;
        subTitle?: string;
    },
    styleContainerCard?: StyleProp<ViewStyle>;
    styleCardBody?: StyleProp<ViewStyle>;
    styleAccordBody?: StyleProp<ViewStyle>;
    textsecondary?: {
        title: string;
        subTitle?: string;
    },
    children?: React.ReactNode;
    expanded?: boolean;
    
}

if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


export const CardDriver = ({
    image,
    text,
    styleContainerCard,
    styleCardBody,
    styleAccordBody,
    textsecondary,
    children,
    expanded
}:CardDriverProps) => {
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [expanded]);

  return (
    <View
        style={[styleCard.accordContainer, styleContainerCard]}
    >
        <View
            style={[styleCard.cardContainer, styleCardBody]}
        >
            <View style={{width: '15%'}} >
                <View style={[styleCard.imgCard]}>
                    {
                        image &&
                        <Image 
                            source={image.source}
                            style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    }
                </View>
            </View>
            <View 
                style={{width: '60%', paddingHorizontal:10}}
            >
                <Typography size={13} color='tundora' styles={{marginBottom: 0}} textProps={{ numberOfLines: 2 }} fontFamily='Poppins-Medium'>{text.title}</Typography>
                {
                    text.subTitle && 
                    <Typography size={11} color='gray' fontFamily='Poppins-Medium' textProps={{ numberOfLines: 1 }} >{text.subTitle}</Typography>
                }
            </View>
            <View 
                style={{width: '25%'}}
            >
                {
                    textsecondary ?
                    <>
                    <Typography size={11} color='gray' textProps={{ numberOfLines: 1 }} fontFamily='Poppins-Light' >{textsecondary.title}</Typography>
                    {
                        textsecondary.subTitle &&
                        <Typography size={10} color='gray' fontFamily='Poppins-Medium' textProps={{ numberOfLines: 1 }} >{textsecondary.subTitle}</Typography>
                    }
                    </>
                    :
                    <View style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '100%'
                        }}
                    >
                        <Button
                            bgColor='curiousBlue'
                            style={[styleCard.btnAction, { marginRight: 15 }]}
                        >
                            <Icon color='white' name='call' size='md' />
                        </Button>
                        <Button
                            bgColor='treePoppy'
                            style={[styleCard.btnAction]}
                        >
                            <Icon color='white' name='chatbubbles' size='md' />
                        </Button>
                    </View>
                }
            </View>
        </View>
        {
            children && expanded &&
            <View style={[styleCard.accordBody, styleAccordBody]}>
                { children }
            </View>
        }
    </View>
  )
}

const styleCard = StyleSheet.create({
    accordContainer: {
        width: '100%',
        backgroundColor: '#fff',
    },
    cardContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 8,
        width: '100%',
    },
    imgCard: {
        display:'flex',
        position: 'relative',
        height: 50,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 50,
    },
    btnAction: {
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    accordBody: {
        paddingTop: 12,
        width: '100%'
    }  
})
