import React, { useState } from 'react'
import { 
  CardUser, 
  LayoutList,
  LoadIndicatorModal,
  Typography
} from '../../components';
import { FilterTransports, FormFilterTransport, ShowUser } from '../components';
import { useFetchDataTable } from '../../hooks';
import { UserTransport } from '../../interfaces';
import { ActivityIndicator, FlatList } from 'react-native';


const formFilterInitValue : FormFilterTransport = {
  dateFrom: '',
  dateTo: '',
  estado: 'pendiente'
}


export const Transports = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [formFilter, setformFilter] = useState<FormFilterTransport>(formFilterInitValue);
  const [user, setuser] = useState<UserTransport>();
  const [loandig, setLoandig] = useState(false);

  const { loandingFetch, data, getNextData, filter, onRefresh } = useFetchDataTable<UserTransport>('/transports', {query: JSON.stringify(formFilterInitValue)});
  console.log("transporter data::", data)


  const onSelectUser = (user: any) => {
    console.log(user)
    // setLoandig(true);
    // setTimeout(() => {
    //   setLoandig(false)
    //   setuser(values => ({...values, ...user}));
    // }, 1500);
  }


  return (
    <LayoutList 
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
        renderItem={({item}) => (
          <CardUser
            onPress={() => onSelectUser(item.user)}
            avatar={{
              type: 'text',
              text: `${item.user.first_name.charAt(0)}${item.user.first_surname.charAt(0)}`
            }}
            label={{
              title: `${item.user.first_name} ${item.user.first_surname}`,
              subTitle: `Carnet: ${item.carnet_circulacion}`,
              date: item.created_at,
              tag: item.nro_placa
            }}
          />
        )}
        onEndReached={() => getNextData({query: JSON.stringify(formFilter)})}
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


      <FilterTransports 
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
        transport={user}
        onSave={() => {
          setuser(undefined);
          onRefresh(formFilter);
        }}
        showAction={user  && user.estado_transporte == 'pendiente' ? true : false}
      />

    </LayoutList>
  )
}
