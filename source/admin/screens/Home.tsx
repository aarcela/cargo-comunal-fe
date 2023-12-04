import React from 'react';
import {CardUser, FabIcon, Grid, Icon, Typography} from '../../components';
import {DrawerScreenProps} from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';

export const Home = ({navigation}: DrawerScreenProps<any>) => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      margin:10 // if you want to fill rows left to right
    },
    item: {
      width: '45%',
      borderColor:"#FFFFFF", backgroundColor:'white', padding:10, borderRadius:10, margin:5 // is 50% of container width
    }
  })
  
  return (
    <View
      style={styles.container}>
      <View style={styles.item}>
        <Icon name='personOutline'  size={42} color='curiousBlue'/>
        <Text>Usuarios</Text>
        <Typography
          size="xl"
          fontFamily="Poppins-Regular"
          color="tundora"
          styles={{
            marginBottom: 10,
            paddingHorizontal: 5,
          }}>
          10
        </Typography>
      </View>
      <View style={styles.item}>
        <Icon name='manOutline'  size={42} color='curiousBlue'/>
        <Text>Conductores</Text>
        <Typography
          size="xl"
          fontFamily="Poppins-Regular"
          color="tundora"
          styles={{
            marginBottom: 10,
            paddingHorizontal: 5,
          }}>
          10
        </Typography>
      </View>
      <View style={styles.item}>
        <Icon name='carOutline'  size={42} color='curiousBlue'/>
        <Text>Transportes</Text>
        <Typography
          size="xl"
          fontFamily="Poppins-Regular"
          color="tundora"
          styles={{
            marginBottom: 10,
            paddingHorizontal: 5,
          }}>
          10
        </Typography>
      </View>
      <View style={styles.item}>
        <Icon name='compassOutline'  size={42} color='curiousBlue'/>
        <Text>Solicitudes</Text>
        <Typography
          size="xl"
          fontFamily="Poppins-Regular"
          color="tundora"
          styles={{
            marginBottom: 10,
            paddingHorizontal: 5,
          }}>
          10
        </Typography>
      </View>
      
    </View>
  );
};
