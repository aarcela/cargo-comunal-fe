import React, {useEffect, useRef} from 'react';
import {
  Grid,
  LayoutList,
  LoadIndicatorModal,
  Typography,
} from '../../components';
import {FetchApi} from '../../utils';
import {ActivityIndicator, FlatList,} from 'react-native';
import { useFetchDataTable } from '../../hooks';
import { CardTravel } from '../../components/cards/CardTravel';

export const Petitions = () => {
  const [peticiones, setPeticiones] = React.useState<any>([]);
  const {loandingFetch, data} =
  useFetchDataTable<any>('/viajes');
  console.log('viajes data::', data);
  // setPeticiones(data);


  // const getSolicitudes = async () => {

  //   const {loandingFetch, data, getNextData, filter, onRefresh} =
  //   useFetchDataTable<any>('/viajes');
  //   console.log('transporter data::', data);
  //   setPeticiones(data);
  //   // setLoading(true);
  //   // const {ok, message, data} = await FetchApi<{data: T[]}>('get', urlFetch);
  //   // setLoading(false);
  //   // console.log('Peticioness: ', await data);
  //   // if (ok && data) {
  //   // }
  // };

  return (
    <LayoutList>
      {!loandingFetch && data?.length == 0 && (
        <Typography styles={{textAlign: 'center'}}>
          No se encontraron resultados
        </Typography>
      )}

      {!loandingFetch &&
        data.length > 0 && (

          <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CardTravel
              label={{
                user:{name: `${item.user.first_name}`, lastname: `${item.user.first_surname}`},
                transport: {name: `${item.user.first_name}`, lastname: `${item.user.first_surname}`},
                date: item.tiempo,
                ruta: item.ruta,
                hora: item.hora,
                status:item.status
              }}
              onPress={()=> {}}
            />
          )}
          //onEndReached={() => getNextData({query: JSON.stringify(formFilter)})}
          onEndReachedThreshold={0.5}
        />

        )}
        
    </LayoutList>
  );
};
