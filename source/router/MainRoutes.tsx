import React, { useContext } from 'react';
import { NavigationInit } from '../initApp';
import { NavigationAdmin } from '../admin';
import { AppClient as NavigationClient  } from '../client'
import { AuthContext } from '../context';
import { LoadIndicatorModal } from '../components';

export const MainRoutes = () => {
  const { status, user } = useContext(AuthContext);


  if( status == 'checking' ){
    return <LoadIndicatorModal 
    visible={status === 'checking'}
    bgColorModal='white'
    isText={false}
    loadIndicatorProps={{
      color: "#3292E1"
    }}
  />
  }

  if( status == 'not-authenticated' ){
    return <NavigationInit />
  }

  const SwhitchRouterApp = () => {
    switch (user!.role) {
      case 'solicitante':
        return <NavigationClient />    
      default:
        return <NavigationAdmin />
    }
  }

  return <SwhitchRouterApp />
}
