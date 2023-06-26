import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  GenerateShipment,
  ConfirmShipment
} from '../../components/createshipment';


export const CreateShipment = ({navigation}: StackScreenProps<any, any>) => {
  
  return (
    <ConfirmShipment />
  )
}
