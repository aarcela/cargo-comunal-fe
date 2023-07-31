import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Grid } from './Grid';
import { FabIcon } from './FabIcon';
import { StylesGlobal } from '../styles';


interface LayoutListProps{
    children: React.ReactNode;
    bottomAdd?: () => void;
    bottomFilter?: () => void;

}

export const LayoutList = ({
    children,
    bottomAdd,
    bottomFilter
}: LayoutListProps) => {
  return (
    <Grid 
        flex={1} 
        bgColor='zircon' 
        paddingVertical={12}  
        propsExtras={{
           
        }}
    >
        

       { children }

       {
            bottomAdd &&
            <FabIcon 
                onPress={bottomAdd}
                position={{
                postion: 'absolute',
                bottom: bottomFilter ? 75 : 25,
                right: 15
                }}
                nameIcon='addSharp'
                bgColor='curiousBlue'
                icon={{size: 'xl', color: 'white'}}
                style={[StylesGlobal.shadow01]}
            />
        }
        {
            bottomFilter && 
            <FabIcon 
                onPress={bottomFilter}
                position={{
                postion: 'absolute',
                bottom: 25,
                right: 15
                }}
                nameIcon='filterSharp'
                bgColor='white'
                icon={{size: 'lg'}}
                style={[StylesGlobal.shadow01]}
            />
        }
        
    </Grid>
  )
}
