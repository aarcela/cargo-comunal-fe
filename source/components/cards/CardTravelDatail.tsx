import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../Typography';

interface CardTravelDetailProps {
    fechaSalida: string;
    tipoCarga: string;
}

export const CardTravelDetail = ({ fechaSalida, tipoCarga }: CardTravelDetailProps) => {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.detailRow}>
            <Typography fontFamily='Poppins-Regular' size='md' color='abbey'>Fecha de salida:</Typography>
            <Typography fontFamily='Poppins-Regular' size='md' color='abbey' styles={{ justifyContent: 'flex-end' }}>{fechaSalida}</Typography>
        </View>
        <View style={styles.detailRow}>
            <Typography fontFamily='Poppins-Regular' size='md' color='abbey'>Tipo de carga:</Typography>
            <Typography fontFamily='Poppins-Regular' size='md' color='abbey' styles={{ justifyContent: 'flex-end' }}>{tipoCarga} Kg</Typography>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Alinea los elementos al inicio y al final del contenedor
        marginBottom: 5,
    },
});
