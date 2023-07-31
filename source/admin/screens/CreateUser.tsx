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
    console.log(' user ', user)

    const { ok, message, data }  = await FetchApi<{message: string}>('post', '/users', user);
    
    setLoanding(false)
    
    console.log(data, 'ss');
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
