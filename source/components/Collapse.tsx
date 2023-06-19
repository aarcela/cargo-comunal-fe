import React, { Children, useState } from 'react';
import { Typography, TypographyProps } from './Typography';
import { 
    View, 
    StyleSheet, 
    ViewStyle, 
    StyleProp, 
    TouchableOpacity,
    Platform,
    UIManager,
    LayoutAnimation
} from 'react-native';
import { Icon, IconProps } from './Icon';

type CollapseProps = {
    title: string;
    insideIconInText?: boolean;
    typographyProps?: TypographyProps;
    children: React.ReactNode;
    styleAccordContainer?: StyleProp<ViewStyle>;
    styleAccordHeader?: StyleProp<ViewStyle>;
    styleAccordBody?: StyleProp<ViewStyle>;
    iconProps?: IconProps;
    
}

if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Collapse = ({ 
    title,
    children,
    insideIconInText = true,
    styleAccordContainer,
    styleAccordHeader,
    styleAccordBody, 
    iconProps,
    typographyProps 
}: CollapseProps) => {
    const [ expanded, setExpanded ] = useState(false);

    const toggleItem = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    } 

    return (
        <View
            style={[stylesCollapse.accordContainer, styleAccordContainer]}
        >
            <TouchableOpacity 
                activeOpacity={0.85}
                style={[styleAccordHeader]} 
                onPress={ toggleItem }
            >
                <Typography {...typographyProps}>
                    {title}
                    {
                        insideIconInText &&
                        <Icon 
                            name={ expanded ? 'chevronUpOutline' : 'chevronDownOutline' } 
                            size={iconProps?.size ? iconProps.size : 'md'}  
                            color={ iconProps?.color && iconProps.color }
                            style={[iconProps?.style]}
                        />
                    }
                </Typography>
                {
                    !insideIconInText &&
                    <Icon 
                        name={ expanded ? 'chevronUpOutline' : 'chevronDownOutline' }
                    />
                }
            </TouchableOpacity>
            {
                expanded && 
                <View 
                    style={[stylesCollapse.accordBody, styleAccordBody]}
                >
                    { children }
                </View>
            }
        </View>
    )
}

const stylesCollapse = StyleSheet.create({
    accordContainer: {
        paddingBottom: 4,
        width: '100%'
    },
    accordBody: {
        paddingTop: 12,
        width: '100%'
    }  
})
