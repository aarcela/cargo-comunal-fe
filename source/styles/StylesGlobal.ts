import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const StylesGlobal = StyleSheet.create({
    btnSm: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 3.2
    },
    btnMd: {
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderRadius: 4
    },
    btnLg: {
        paddingHorizontal: 21,
        paddingVertical: 18,
        borderRadius: 4.8
    },
    btnPrimary: {
        backgroundColor: Colors.curiousBlue,
        color: Colors.white,
        borderColor: Colors.curiousBlue
    },
    btnLight:{
        backgroundColor: Colors.white,
        color: Colors.tundora,
        borderColor: Colors.gallery
    },
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
    },
    verticalCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});