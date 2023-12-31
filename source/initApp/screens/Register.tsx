import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AlertResp, CreateUser } from '../../components/user/CreateUser';
import { UserEntity } from '../../interfaces';
import { FetchApi } from '../../utils';

export const Register = ({navigation}: StackScreenProps<any, any>) => {

  const [loanding, setLoanding] = useState(false);
  const [respFetch, setrespFetch] = useState<AlertResp>({
    show: false,
    type: 'error',
    text: ''
  })

  const onSubmit = async(user: UserEntity) => {
    setLoanding(true)
    console.log(' user ', user)

    const { ok, message, data }  = await FetchApi<{message: string}>('post', '/register', user);
    
    setLoanding(false)
    
    console.log(data, 'ss');
    if( ok && data ){
      setrespFetch(values => ({...values, show: true, type: 'success', text: data.message}));
      setTimeout(() => {
        navigation.navigate('InitApp')
      }, 3000);

      return;
    }

    setrespFetch(values => ({...values, show: true, type: 'error', text: message!}));

    setTimeout(() => {
      setrespFetch(values => ({...values, show: false}))
    }, 3000);

  }


  return (
    <CreateUser 
      onRegister={onSubmit}
      onLoanding={loanding}
      alert={{
        ...respFetch,
        onClose: () => setrespFetch(values => ({...values, show: false}))
      }}
    />
  )
}
