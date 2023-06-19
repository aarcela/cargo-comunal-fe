import React, { useState, useEffect } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, IoniconsName } from '../styles';


export type IconProps = {
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    color?: keyof typeof Colors;
    style?: StyleProp<TextStyle>
}  

type Icon = IconProps & {
    name: keyof typeof IoniconsName;
}

export const Icon = ({
    size = 'sm',
    color,
    name,
    style
}: Icon) => {
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
        <Ionicons 
            name={IoniconsName[name]}
            size={fs}
            color={color && Colors[color]}
            style={style}
        />
    )
}
