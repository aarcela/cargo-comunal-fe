import React, { useState } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import { Button, CardMethodsPayment, Grid, Typography, OutlinedInput, Alert } from '../../components';
import { MethodPayment } from '../../interfaces/methodPayment';
import { MethodPaymentShipment } from '../../interfaces/shipment';

interface PaymentMethodsProps {
    active: boolean;
    methodPayment: MethodPaymentShipment | null;
    amount: number;
    onConfirm: (data: MethodPaymentShipment) => void;
}

export const PaymentMethods = ({
    active,
    methodPayment,
    onConfirm,
    amount
}:PaymentMethodsProps) => {
    const [cash, setCash] = useState<number | undefined>(methodPayment?.wallet?.amount);
    const [methodPaymentShipment, setMethodPaymentShipment] = useState<MethodPayment | null>(methodPayment);
    const [msgError, setMsgError] = useState<string | undefined>();

    const confirmMethodPayment = () => {
        
        if( methodPaymentShipment == null  ){
            setMsgError('Debe seleccionar un método de pago');
            return;
        }

        let method : MethodPaymentShipment = methodPaymentShipment;


        if( methodPaymentShipment.id == 2 ){
            if( cash == undefined ){
                setMsgError('Si seleccionó el pagar en efectivo, debe ingresar el monto a pagar');
                return;
            }else if ( cash < amount ){
                setMsgError(`El monto a pagar en efectivo, debe ser igual o superior a ${amount}`);
                return;
            }

            method.wallet = {
                amount: cash
            }
        }

        
        onConfirm(method);
    }

    return (
        <Modal 
            visible={active} 
            statusBarTranslucent 
            transparent 
            animationType='fade'
            style={{
                flex: 1
            }}
        >
        <SafeAreaView
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid container bgColor='white' justifyContent='space-between' paddingVertical={20} flexDirection='column'>
                <Alert 
                    isVisible={msgError !== undefined}
                    isAnimated
                    position='top'
                    top={35}
                    children={msgError}
                    typeBg='error'
                    isTypeIcon='error'
                    delayAutomatic={6000}
                    useStateOpacity={() => setMsgError(undefined)}
                mh={15}
                />
                <Grid alignItems='center' marginVertical={25}>
                    <Typography size={14} styles={{textAlign: 'center'}}>Selecciona un método de pago, para continuar con la solicitud</Typography>
                    <Grid spacing={3} marginTop={25}>
                        <CardMethodsPayment 
                            image={{
                                source: require('../../assets/images/wallet.png')
                            }}
                            text={{
                                titleUp: 'Billetera',
                                subTitleDown: 'Balance:',
                                subTitleDownVal: '$150.00'
                            }}
                            checked={{
                                val: 0,
                                check: methodPaymentShipment?.id === 0,
                                onChangeValue:(val) => setMethodPaymentShipment(val)
                            }}
                        />
                        <CardMethodsPayment 
                            image={{
                                source: require('../../assets/images/paypal.png')
                            }}
                            text={{
                                titleUp: 'PayPal',
                                subTitleDown: 'Total a pagar:',
                                subTitleDownVal: amount
                            }}
                            checked={{
                                val: 1,
                                check: methodPaymentShipment?.id === 1,
                                onChangeValue:(val) => setMethodPaymentShipment(val)
                            }}
                        />
                        <Typography color='mineShaft'>Pagar En Efectivo</Typography>
                        <CardMethodsPayment 
                            image={{
                                source: require('../../assets/images/cash.png')
                            }}
                            text={{
                                titleUp: '',
                            }}
                            checked={{
                                val: 2,
                                check: methodPaymentShipment?.id === 2,
                                onChangeValue:(val) => setMethodPaymentShipment(val)
                            }}
                        >
                            <OutlinedInput 
                                labelText='Ingresa el monto'
                                value={cash}
                                onChangeText={(val) => setCash(val)}
                                inputStyle={{
                                    borderRadius:0,
                                    borderBottomWidth: 1,
                                    borderColor: '#C8C8C8',
                                    paddingLeft: 0,
                                    height: 45,
                                    paddingTop: 10
                                }}
                                inputProps={{
                                    keyboardType: 'numeric'
                                }}
                            />
                        </CardMethodsPayment>
                    </Grid>
                </Grid>
                <Button
                    typeStyle='btn-primary'
                    size='sm'
                    style={{marginBottom: 20}}
                    onPress={confirmMethodPayment}
                >
                    <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                        Continuar
                    </Typography>
                </Button>
            </Grid>
        </SafeAreaView>
        </Modal>
    )
}
