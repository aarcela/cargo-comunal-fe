import React from 'react';
import {Image} from 'react-native';
import {Grid} from '../Grid';
import {Button} from '../Button';
import {Typography} from '../Typography';

type CardProfileButtonProps = {
  title: string;
  paragraph: string;
  typeBtn: 'driver' | 'applicant' | 'analyst';
  isSelect?: boolean;
  onPress: () => void;
};

export const CardProfileButton = ({
  title,
  paragraph,
  typeBtn,
  isSelect = false,
  onPress,
}: CardProfileButtonProps) => {
  return (
    <Button
      size="default"
      onPress={onPress}
      typeStyle="default"
      bgColor={isSelect ? 'curiousBlue' : 'white'}
      style={{
        marginTop: 22,
        width: '100%',
        maxHeight: 150,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 25,
        position: 'relative',
      }}>
      <Grid width={'60%'} paddingRight={5}>
        <Typography size="lg" color="tundora" fontFamily="Poppins-Medium">
          {title}
        </Typography>
        <Typography
          size="md"
          color={isSelect ? 'white' : 'gray'}
          fontFamily="Poppins-Light">
          {paragraph}
        </Typography>
      </Grid>
      <Grid width={'40%'}>
        <Grid
          display="flex"
          position="relative"
          alignItems="flex-end"
          justifyContent="center"
          width="100%">
          <Image
            source={
              typeBtn == 'applicant'
                ? require('../../assets/images/solicitante.png')
                : typeBtn == 'analyst'
                ? require('../../assets/images/chart.png')
                : require('../../assets/images/Delivery.png')
            }
            style={{
              maxHeight: 65,
              maxWidth: 133,
              resizeMode: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </Button>
  );
};
