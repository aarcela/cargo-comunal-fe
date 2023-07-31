import React, { useEffect, useContext, useState } from 'react'
import { ScrollView } from 'react-native';
import { AlertType, Grid, Typography } from '../../../components'
import { FormTransport, TransportObject } from '../../components';
import { AuthContext } from '../../../context';
import { FetchApi } from '../../../utils';
import { TransportUserDriver, UserTransport } from '../../../interfaces';
import { ActivityIndicator } from 'react-native';


const value : TransportObject = {
  nro_placa: '',
  carnet_circulacion: '',
  marca: '',
  modelo: '',
  carga_maxima: '',
  id_user: ''
}

export const MyTransport = () => {
  const { user } = useContext(AuthContext);
  const [transport, setTransport] = useState(value);
  const [loading, setLoading] = useState(true);
  const [messageEstado, setmessageEstado] = useState<string>()
  const [typeMessageEstado, setTypeMessageEstado] = useState<AlertType>('warning');
  const [loandingFetch, setLoandingFetch] = useState(false);
  const [alert, setAlert] = useState<{show: boolean, type: AlertType, msg: string}>({
    show: false,
    type: 'error',
    msg: ''
  })

  useEffect(() => {
    
    getTransportUser();
  
  }, [])
  
  const dta = (data: TransportUserDriver) => {
    const { id_user, nro_placa, carnet_circulacion, marca, modelo, carga_maxima, estado_transporte } = data;

    if( estado_transporte == 'pendiente' ){
      setmessageEstado('El transporte, se encuentra en estado de verificación');
    }

    if( estado_transporte == 'aprobado' ){
      setmessageEstado('El transporte fue aprobado');
      setTypeMessageEstado('success');
    }

    if( estado_transporte == 'cancelado' ){
      setmessageEstado('El transporte fue cancelado, puede intentarlo de nuevo')
      setTypeMessageEstado('error');
    }

    setTransport(values => ({
      ...values,
      nro_placa,
      carga_maxima,
      carnet_circulacion,
      marca,
      modelo,
      id_user,
      estado_transporte
    }))
  }

  const getTransportUser = async() => {
    const url = `/transports/${user!.id_user}`;

    const { ok, data } = await FetchApi<{data: UserTransport}>('get', url);
    console.log(data)

    if( ok ){
      if(  data && data.data != null ){
        dta(data.data);
      }
    }

    setLoading(false);
  } 

  const onSumbit = async(transport: TransportObject) => {
   
    setLoandingFetch(true);

    if( transport.id_user == '' ){
      transport.id_user = user!.id_user;
    }
 
    setAlert(values => ({...values, show: true, type: 'success', msg: 'sn ksndsk'}))

    const { ok, message, data } = await FetchApi<{message: string, data: TransportUserDriver}>('post', '/transports', transport);
    console.log(data)

    if( ok && data ){
      setAlert(values => ({...values, show: true, type: 'success', msg: data.message}))
      
      setTimeout(() => {
       getTransportUser();
      }, 2000);
     
    }

    if(!ok){
      setAlert(values => ({...values, show: true, type: 'error', msg: message!}))
    }

  
    setLoandingFetch(false);

  }

  if( loading ){
    return (
      <Grid display='flex' alignItems='center' flex={1} justifyContent='center'>
        <ActivityIndicator
         size={38}
          color='#3292E1'
          style={{position: 'absolute' }}
        />    
      </Grid>
    )
  }

  return (
    <FormTransport 
      onLoanding={loandingFetch}
      objectValue={transport}
      message={ messageEstado  }
      typeMessage={typeMessageEstado}
      onSubmit={(values) => onSumbit(values)}
      alert={{
        ...alert,
        onClose: () => setAlert(values => ({...values, show: false}))
      }}
      showBtn={ transport.estado_transporte && (transport.estado_transporte == 'pendiente' || transport.estado_transporte == 'aprobado' ) ? false :true }
    />
  )
}
