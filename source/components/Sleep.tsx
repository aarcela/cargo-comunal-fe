import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../styles';

export type PropSleep = {
    active: boolean
}

export const Sleep = ({ active } : PropSleep) => {

    return (
        <View 
            style={[
                styleSleep.circule, 
                ( active ) ? 
                styleSleep.circuleActive : styleSleep.circuleInactive,
            ]} 
            
        />
    )
}

const styleSleep = StyleSheet.create({
    circule: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 6,
    },
    circuleInactive: {
        backgroundColor: Colors.cello
    },
    circuleActive: {
        backgroundColor: Colors.treePoppy
    }
})