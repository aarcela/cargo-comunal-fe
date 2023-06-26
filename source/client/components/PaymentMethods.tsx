import React, { useState } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import { Button, CardMethodsPayment, Grid, Typography, OutlinedInput } from '../../components';

interface PaymentMethodsProps {
    active: boolean;
    onConfirm: () => void;
}

export const PaymentMethods = ({
    active,
    onConfirm
}:PaymentMethodsProps) => {
    const [cash, setCash] = useState('');
    const [method, setMethod] = useState<number>()

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
                                check: method === 0,
                                onChangeValue:(val: number) => setMethod(val)
                            }}
                        />
                        <CardMethodsPayment 
                            image={{
                                source: require('../../assets/images/paypal.png')
                            }}
                            text={{
                                titleUp: 'PayPal',
                                subTitleDown: 'Total a pagar:',
                                subTitleDownVal: '$120.00'
                            }}
                            checked={{
                                val: 1,
                                check: method === 1,
                                onChangeValue:(val: number) => setMethod(val)
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
                                check: method === 2,
                                onChangeValue:(val: number) => setMethod(val)
                            }}
                        >
                            <OutlinedInput 
                                labelText='Ingresa el monto'
                                value={cash}
                                onChangeText={() => null}
                                inputStyle={{
                                    borderRadius:0,
                                    borderBottomWidth: 1,
                                    borderColor: '#C8C8C8',
                                    paddingLeft: 0,
                                    height: 45,
                                    paddingTop: 10
                                }}
                            />
                        </CardMethodsPayment>
                    </Grid>
                </Grid>
                <Button
                    typeStyle='btn-primary'
                    size='sm'
                    style={{marginBottom: 20}}
                    onPress={onConfirm}
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
