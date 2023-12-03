import React, {useContext, useEffect} from 'react';
import {Grid, Typography} from '../../../components';
import {AuthContext} from '../../../context';
import {FetchApi} from '../../../utils';
import {UserTransport} from '../../../interfaces';
import {CardTransport} from '../../../components/cards/CardTransport';
import { Text } from 'react-native';

export const MyProfile = () => {
  const {user} = useContext(AuthContext);
  const [transport, setTransport] = React.useState<any>([]);
  const getTransportUser = async () => {
    const url = `/transports/${user!.id}`;

    // console.log("data:",data)
    const {ok, data} = await FetchApi<{data: any}>('get', url);

    if (ok) {
      if (data && data.data != null) {
        // dta(data.data);
        setTransport([data.data]);
      }
    }
  };

  useEffect(() => {
    getTransportUser();
  });

  return (
    <Grid container marginTop={20} gap={4}>
      {transport.length > 0 && transport?.map((transporData: any) => 
        <CardTransport
          modelo={transporData.modelo}
          marca={transporData.marca}
          estado={transporData.estado}
          max_load={transporData.carga_maxima}
        />
      )}
    </Grid>
  );
};
