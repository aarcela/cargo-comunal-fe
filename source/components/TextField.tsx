import React, {useState} from 'react';
import {
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TouchableOpacity as Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Typography, TypographyProps, Grid, Icon} from './';
import {Colors} from '../styles';

export interface TextFiedProps {
  labelText?: string;
  labelTextProps?: TypographyProps;
  value: any;
  onChangeText: (field: any) => void;
  inputProps?: TextInputProps;
  inputStyle?: StyleProp<ViewStyle>;
  isTextField?: boolean;
  isError?: boolean;
  messageError?: string;
  onPressIconRight?: () => void;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  isDate?: boolean;
}

export const TextField = ({
  labelText,
  labelTextProps,
  value,
  onChangeText,
  inputProps,
  isTextField = true,
  inputStyle,
  isError,
  messageError = '',
  onPressIconRight,
  iconRight,
  children,
  isDate = false,
}: TextFiedProps) => {
  const [isFocus, setisFocus] = useState(false);
  const [isModalDate, setIsModalDate] = useState(false);

  return (
    <Grid marginTop={10} width="100%">
      {labelText && (
        <Typography
          size="sm"
          fontFamily="Poppins-Medium"
          color="scorpion"
          textProps={{numberOfLines: 2}}
          styles={{...labelTextProps?.styles}}>
          {labelText}
        </Typography>
      )}
      <Grid position="relative" marginBottom={8}>
        {isDate && (
          <>
            <Button
              onPress={() => setIsModalDate(true)}
              activeOpacity={1}
              style={{
                position: 'absolute',
                bottom: 0,
                height: 30,
                backgroundColor: 'transparent',
                width: '100%',
                zIndex: 1024,
              }}
            />
            <Date
              visible={isModalDate}
              onCancel={() => setIsModalDate(false)}
              onChangeText={onChangeText}
            />
          </>
        )}
        <TextInput
          onChangeText={onChangeText}
          onBlur={() => setisFocus( value != '' ? true : false)}
          value={value}
          autoCapitalize="none"
          onFocus={() => setisFocus(true)}
          style={[
            isTextField && {
              height: 50,
              backgroundColor: 'transparent',
              borderBottomColor:
                isFocus || value !== ''
                  ? Colors.treePoppy
                  : isError
                  ? Colors.error
                  : Colors.silver,
              borderBottomWidth: 1,
              paddingBottom: 0,
              paddingHorizontal: 0,
              paddingRight: iconRight ? 35 : 0,
              paddingTop: 0,
            },
            inputStyle,
            {
              fontSize: 17,
              fontFamily: 'Poppins-Light',
              color: Colors.rollingStone,
              lineHeight: 20,
            },
          ]}
          {...inputProps}
        />
        {iconRight && (
          <Button
            onPress={isError ? undefined : onPressIconRight}
            activeOpacity={0.65}
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              width: 35,
              height: '100%',
              zIndex: 1024,
              right: 0,
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isError ? (
              <Icon name="alertCircleOutline" size="lg" color="error" />
            ) : (
              iconRight
            )}
          </Button>
        )}
        {children}
      </Grid>
      {isError && (
        <Typography size={14} fontFamily="Poppins-Medium" color="error">
          {messageError}
        </Typography>
      )}
    </Grid>
  );
};

type PropsDate = {
  visible?: boolean;
  onCancel: () => void;
  onChangeText: (field: string) => void;
};

const Date = ({visible = false, onCancel, onChangeText}: PropsDate) => {
  return (
    <DateTimePickerModal
      testID="idDate"
      mode="date"
      isVisible={visible}
      onConfirm={(date: Date) => {
        const day = `${date.getDate()}`.padStart(2, '0');
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const year = date.getFullYear();

        onChangeText(`${day}-${month}-${year}`);
        onCancel();
      }}
      onCancel={onCancel}
    />
  );
};
