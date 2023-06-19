import React, { ReactNode, useEffect, useState } from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { Colors } from '../styles';


export type TypographyProps = {
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    fontFamily?: 'Poppins-Light' | 'Poppins-Regular' | 'Poppins-Medium' | 'Poppins-SemiBold';
    color?: keyof typeof Colors;
    styles?: TextStyle;
    textProps?: TextProps;
}

interface Typography extends TypographyProps{
    children: ReactNode;
}

export const Typography = ({
    children,
    size = 'md',
    fontFamily = 'Poppins-Regular',
    color,
    styles,
    textProps
}: Typography) => {
    const [fs, setFs] = useState(0);

    useEffect(() => {
        
        if( size && typeof size === 'number' ){
            setFs(size);
        }else{
            switch (size) {
                case 'sm':
                    setFs(12);
                    break;
                case 'md':
                    setFs(15);
                    break;
                case 'lg':
                    setFs(18);
                    break;
                case 'xl':
                    setFs(21);
                    break;
                default:
                    break;
            }
        }

    }, [size])
    

    return (
        <Text
            {...textProps}
            style={{
                fontSize: fs,
                fontFamily: fontFamily,
                color: color && Colors[color],
                ...styles
            }}
        >
            { children }
        </Text>
    )
}
