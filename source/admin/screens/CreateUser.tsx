import React, { useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CreateUser  as UserCreate, AlertResp } from '../../components/user/CreateUser';
import { UserEntity } from '../../interfaces/user';
import { FetchApi } from '../../utils';
import { AuthContext } from '../../context';


export const CreateUser = ({navigation}: StackScreenProps<any, any>) => {
  const { user } = useContext(AuthContext)
  const [loanding, setLoanding] = useState(false);
  const [respFetch, setrespFetch] = useState<AlertResp>({
    show: false,
    type: 'error',
    text: ''
  })

  const onSubmit = async(user: UserEntity) => {
    setLoanding(true)

    user.fecha_nc = formatDate(user.fecha_nc);
    const { ok, message, data }  = await FetchApi<{message: string}>('post', '/register', user);
    
    setLoanding(false)
    
    if( ok && data ){
      setrespFetch(values => ({...values, show: true, type: 'success', text: data.message}));
      setTimeout(() => {
        navigation.navigate('NavDrawer')
      }, 3000);

      return;
    }

    setrespFetch(values => ({...values, show: true, type: 'error', text: message!}));

    setTimeout(() => {
      setrespFetch(values => ({...values, show: false}))
    }, 3000);

  }

  const formatDate = (originalDate: any) => {
    // Analizar la fecha original en el formato "DD-MM-YYYY"
    const parts = originalDate.split("-");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
  
    // Crear una nueva fecha con la hora, los minutos y los segundos establecidos en 00:00:00
    const formattedDate = new Date(year, month - 1, day, 0, 0, 0);
  
    // Formatear la nueva fecha en el formato deseado "YYYY-MM-DD 00:00:00"
    const formattedString = formattedDate.toISOString().split("T")[0] + " 00:00:00";
  
    return formattedString;
  };
  

  return (
    <UserCreate 
      activeAnalist={ user != null && user.role == 'administrador' ? true: false }
      onRegister={onSubmit}
      onLoanding={loanding}
      alert={{
        ...respFetch,
        onClose: () => setrespFetch(values => ({...values, show: false}))
      }}
    />
  )
}
