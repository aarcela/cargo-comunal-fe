import React, { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {  ActivityIndicator, FlatList, PanResponder } from 'react-native';
import { 
  CardUser, 
  LayoutList,
  LoadIndicatorModal,
  Typography
} from '../../components';
import { FilterUsers, FormFilterUsers, ShowUser } from '../components';
import { useFetchDataTable } from '../../hooks';
import { User } from '../../interfaces/user';


const formFilterInitValue  : FormFilterUsers = {
  dateFrom: '',
  dateTo: '',
  rol: 'conductor',
  estado: 'aprobado'
}


export const Users = ({ navigation }: DrawerScreenProps<any>) => {
  const [showFilter, setShowFilter] = useState(false);
  const [formFilter, setformFilter] = useState<FormFilterUsers>(formFilterInitValue);
  const [user, setuser] = useState<User>();
  const [loandig, setLoandig] = useState(false);

  const { loandingFetch, data, getNextData, filter, onRefresh } = useFetchDataTable<User>('/users', { query: JSON.stringify(formFilterInitValue) });

  const onSelectUser = (user: User) => {
    setLoandig(true);
    setTimeout(() => {
      setLoandig(false)
      setuser(values => ({...values, ...user}));
    }, 1500);
  }


  return (
    <LayoutList 
      bottomAdd={() => navigation.navigate('CreateUser')}
      //bottomFilter={() => setShowFilter(true)}
    >
      <LoadIndicatorModal 
          visible={loandig}
          isText={true}
          text='Cargando Informacion...'
          loadIndicatorProps={{
          color: "#fff"
          }}
      />
      {
        !loandingFetch && data.length == 0 &&
        <Typography styles={{textAlign: 'center'}}>No se encontraron resultados</Typography>
      }
      
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
           <CardUser
             onPress={() => onSelectUser(item)}
             avatar={{
               type: 'text',
               text: item.first_name && item.first_surname ? `${item.first_name.charAt(0)}${item.first_surname.charAt(0)}` : 'NN'

             }}
             label={{
               title: `${item.first_name} ${item.first_surname}`,
               subTitle: item.email,
               date: item.fecha_creado,
               tag: item.role
             }}
          />
        )}
       // onEndReached={() => getNextData({query: JSON.stringify(formFilter)})}
        onEndReachedThreshold={0.5}
      />

      {
        loandingFetch &&
        <ActivityIndicator
         size={38}
          color='#3292E1'
          style={{position: 'absolute', top: '20%', left: '45%'}}
        />    
      } 

      

      <FilterUsers 
        show={showFilter}
        filter={formFilter}
        close={() => setShowFilter(false)}
        onFilter={(newValues) => {
          console.log('sa')
          setformFilter(values => ({...values, ...newValues}));
          setShowFilter(false);
          filter({query: JSON.stringify(newValues)})
        }}
        onReset={() => {
          setformFilter(values => ({...values, ...formFilterInitValue}));
          setShowFilter(false);
          filter({query: JSON.stringify(formFilterInitValue)})
        }}
        
      />

      <ShowUser 
        show={user !== undefined}
        close={() =>  setuser(undefined)}
        user={user}
        onSave={() => {
          setuser(undefined);
          onRefresh(formFilter);
        }}
        showAction={user  && user.estado == 'pendiente' ? true : false}
      />

    </LayoutList>
  )
}
