import React, { useState } from 'react';
import { Alert, AlertType, Avatar, Button, Grid, LoadIndicatorModal, Modalize, Typography } from '../../components';
import { StateUser, User } from '../../interfaces/user';
import { FetchApi } from '../../utils';
import { TransportStateDriver, UserTransport } from '../../interfaces/transport/index';


interface ShowUserProps{
    show: boolean;
    close: () => void;
    onSave: () => void;
    transport?: UserTransport;
    user?: User;
    showAction?: boolean;
}

export const ShowUser = ({
    show,
    close,
    transport,
    user,
    onSave,
    showAction = true
}: ShowUserProps) => {
    const [loandig, setLoandig] = useState(false);
    const [alert, setAlert] = useState<{show: boolean, type: AlertType, text: string}>({
        show: false,
        type: 'error',
        text: ''
    })

    const userUpdate = async(value: StateUser) => {
        setLoandig(true);
        const url = `/users/${user!.id_user}`;
        const { ok, message, data } = await FetchApi<{message: string}>('put', url,{estado: value});

        if( !ok ){
            setAlert(values => ({...values, show: true, text: message!, type: 'error'}))
        }else{
            setAlert(values => ({...values, show: true, text: data!.message, type: 'success'}));
            setTimeout(() => {
                onSave();
            }, 2000);
        }

        setLoandig(false);
        
        
    }

    const transportUpdate = async(value: TransportStateDriver) => {
        setLoandig(true);
        const url = `/transports/${transport!.id_user_transporte}`;
        const { ok, message, data } = await FetchApi<{message: string}>('put', url,{estado: value});

        if( !ok ){
            setAlert(values => ({...values, show: true, text: message!, type: 'error'}))
        }else{
            setAlert(values => ({...values, show: true, text: data!.message, type: 'success'}));
            setTimeout(() => {
                onSave();
            }, 2000);
        }

        setLoandig(false);
    }
    
  return (
    <Modalize
        active={show}
        heightModalize='100%'
        onClose={close}
        transparent={false}
    >
        <Alert 
            isVisible={alert.show}
            isAnimated
            position='top'
            children={alert.text}
            typeBg={alert.type}
            isTypeIcon={alert.type}
            delayAutomatic={6000}
            mh={15}
            useStateOpacity={() => setAlert(values => ({...values, show: false}))}
        />
        <LoadIndicatorModal 
            visible={loandig}
            isText={true}
            text='Actualizando Informacion...'
            loadIndicatorProps={{
            color: "#fff"
            }}
        />
        {
            user &&

            <Grid container spacing={0.5} alignItems='center'>
            <Avatar 
                width={80}
                height={80}
                radius={80}
                labelAvatar={`${user!.first_name.charAt(0)}${user!.first_surname.charAt(0)}`}
                labelProps={{size: 'lg'}}
                stylesAvatar={{marginBottom: 20}}
            />
            <Typography styles={{marginRight: 10}} fontFamily='Poppins-SemiBold'>{user!.role}</Typography>
            <Typography styles={{marginRight: 10, marginBottom: 15}} fontFamily='Poppins-Medium'>{`${user!.first_name} ${user!.first_surname}`}</Typography>
            <Grid display='flex' flexDirection='row' width='100%'>
                <Typography styles={{marginRight: 10}}>Cédula:</Typography>
                <Typography fontFamily='Poppins-Medium'>{user!.ci}</Typography>
            </Grid>
            <Grid display='flex' flexDirection='row' width='100%'>
                <Typography styles={{marginRight: 10}}>Télefono:</Typography>
                <Typography fontFamily='Poppins-Medium'>{user!.phone}</Typography>
            </Grid>
            <Grid display='flex' flexDirection='row' width='100%'>
                <Typography styles={{marginRight: 10}}>Email:</Typography>
                <Typography fontFamily='Poppins-Medium'>{user!.email}</Typography>
            </Grid>
            <Grid display='flex' flexDirection='row' width='100%'>
                <Typography styles={{marginRight: 10}}>Fecha Nacimiento:</Typography>
                <Typography fontFamily='Poppins-Medium'>{user!.fecha_nc}</Typography>
            </Grid>

            {
                transport &&
                <>
                    <Grid display='flex' flexDirection='row' width='100%'>
                        <Typography styles={{marginRight: 10}}>Carnet:</Typography>
                        <Typography fontFamily='Poppins-Medium'>{transport.carnet_circulacion}</Typography>
                    </Grid>
                    <Grid display='flex' flexDirection='row' width='100%'>
                        <Typography styles={{marginRight: 10}}>Marca:</Typography>
                        <Typography fontFamily='Poppins-Medium'>{transport.marca}</Typography>
                    </Grid>
                    <Grid display='flex' flexDirection='row' width='100%'>
                        <Typography styles={{marginRight: 10}}>Modelo:</Typography>
                        <Typography fontFamily='Poppins-Medium'>{transport.modelo}</Typography>
                    </Grid>
                    <Grid display='flex' flexDirection='row' width='100%'>
                        <Typography styles={{marginRight: 10}}>Placa:</Typography>
                        <Typography fontFamily='Poppins-Medium'>{transport.nro_placa}</Typography>
                    </Grid>
                    <Grid display='flex' flexDirection='row' width='100%'>
                        <Typography styles={{marginRight: 10}}>Carga Máxima:</Typography>
                        <Typography fontFamily='Poppins-Medium'>{transport.carga_maxima}</Typography>
                    </Grid>
                </>
            }
            {
                showAction &&
                <Grid marginTop={40} display='flex' flexDirection='row'>
                    <Grid width={'50%'} paddingRight={10}>
                        <Button
                            typeStyle='btn-primary'
                            size='sm'
                            onPress={() => {
                                if( transport == undefined){
                                    userUpdate('aprobado')
                                }else{
                                    transportUpdate('aprobado')
                                }
                            }}
                        >
                            <Typography color='white' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 25}}>
                                Aprobar
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid width={'50%'} paddingLeft={10}>
                        <Button
                            typeStyle='btn-light'
                            borderWidth={1}
                            size='sm'
                            onPress={() => {
                                if( transport == undefined ){
                                    userUpdate('cancelado')
                                }else{
                                    transportUpdate('cancelado')
                                }
                            }}
                        >
                        <Typography color='rollingStone' fontFamily='Poppins-Medium' size={16} styles={{textTransform:'uppercase', textAlign: 'center', lineHeight: 23}}>
                            Rechazar
                        </Typography>
                        </Button>
                    </Grid>
                </Grid>
            }
         </Grid>
        }
        
    </Modalize>
  )
}
