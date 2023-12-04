import React, {useEffect, useMemo} from 'react';
import {
  Image,
  ImageProps,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Button} from '../Button';
import {Grid} from '../Grid';
import {Typography} from '../Typography';
import {Icon} from '../Icon';

interface CardTransportProps {
  max_load: string;
  estado: string;
  marca: string;
  modelo: string;
}

export const CardTransport = ({
  max_load,
  estado,
  modelo,
  marca,
}: CardTransportProps) => {
  return (
    <Button
      bgColor={'white'}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#C8C8C8',
      }}>
      <Grid width={'25%'}>
        <Grid
          display="flex"
          position="relative"
          alignItems="flex-end"
          justifyContent="center"
          height={95}
          width="100%">
            <Image
              source={require('../../assets/images/icon-truck.png')}
              style={{
                maxWidth: '100%',
                resizeMode: 'contain',
              }}
            />
        </Grid>
      </Grid>
      <Grid
        width="75%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft={8}
        paddingVertical={15}>
        <Grid width="70%" spacing={0} paddingRight={0}>
          <Typography
            size={13}
            color="tundora"
            styles={{marginBottom: 5}}
            textProps={{numberOfLines: 1}}
            fontFamily="Poppins-Medium">
            {marca}
          </Typography>
          <Typography
            size={13}
            color="tundora"
            styles={{marginBottom: 5}}
            textProps={{numberOfLines: 1}}
            fontFamily="Poppins-Medium">
            {modelo}
          </Typography>
          <Typography
            size={11}
            color="gray"
            fontFamily="Poppins-Light"
            textProps={{numberOfLines: 2}}>
            Carga Máxima: {max_load}kg
          </Typography>
        </Grid>
        <Grid width="30%" alignItems="flex-end">
        <Typography
            size={11}
            color="gray"
            fontFamily="Poppins-Light"
            textProps={{numberOfLines: 2}}>
            {estado}
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
};
