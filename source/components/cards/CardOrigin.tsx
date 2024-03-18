import React from 'react';
import { View, StyleSheet, Image, ImageProps } from 'react-native';
import { Typography } from '../Typography';

interface CardOriginProps {
    image?: ImageProps;
    origen: string;
    destino: string;
}

export const CardOrigin = ({ image, origen, destino }: CardOriginProps) => {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
            {image && <Image source={image.source} style={styles.image} />}
        </View>
        <View style={styles.detailContainer}>
            <View style={styles.detailRow}>
                <Typography fontFamily='Poppins-Regular' size='sm' color='royalBlue'>Origen:</Typography>
                <Typography fontFamily='Poppins-Regular' size='sm' color='abbey'>{origen}</Typography>
            </View>
            <View style={styles.detailRow}>
                <Typography fontFamily='Poppins-Regular' size='sm' color='treePoppy'>Destino:</Typography>
                <Typography fontFamily='Poppins-Regular' size='sm' color='abbey'>{destino}</Typography>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 8,
        marginVertical: 5,
        padding: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    detailContainer: {
        flex: 1,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});