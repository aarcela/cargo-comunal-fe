import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBarProps, SceneRendererProps, Route } from 'react-native-tab-view';
import { Grid } from '../Grid'
import { UserEntity } from '../../interfaces';
import { Sleep } from '../Sleep';
import { StepProfile, StepPersonal, StepExtra } from './';


type CreateUserProps = {
    activeAnalist?: boolean;
}

interface renderSceneProps extends SceneRendererProps{
    route: Route;
} 

export const CreateUser = ({ activeAnalist = false }: CreateUserProps) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'profile', title: 'Perfil de Usuario' },
        { key: 'personal', title: 'Datos Personales' },
        { key: 'extra', title: 'Información adicional' },
    ]);

    const [objUser, setObjUser] = useState<UserEntity>({
        first_name: '',
        second_name: '',
        first_surname: '',
        second_surname: '',
        phone: '',
        ci: '',
        fecha_nc: '',
        email: '',
        username: '',
        role: '',
        password: ''
    });


    const onSubmit = (val: any) => {
        console.log('values extras', val)

        console.log('aqui data user', objUser);

        console.log('completed user data', {...objUser, ...val})
    }

    const renderScene = ({route, jumpTo}: renderSceneProps) => {
        switch (route.key) {
          case 'profile':
            return <StepProfile objUser={objUser} setObjUser={val => setObjUser(values => ({...values, ...val}))} prev={val => null} next={val => jumpTo(val)} isAnalist={activeAnalist} />;
          case 'personal':
            return <StepPersonal objUser={objUser} setObjUser={val => setObjUser(values => ({...values, ...val}))}  prev={val => jumpTo(val)} next={val => jumpTo(val)} />;
            case 'extra':
                return <StepExtra objUser={objUser} setObjUser={val => setObjUser(values => ({...values, ...val}))} prev={val => jumpTo(val)} next={val => null} onSubmit={onSubmit} />;
          default:
            return null;
        }
    };

    return (
        <Grid flex={1} bgColor='zircon'>
            <TabView 
                renderTabBar={(props) => <TabBar {...props} />}
                navigationState={{ index, routes }}
                renderScene={props => renderScene({...props})}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                tabBarPosition='bottom'
                swipeEnabled={false}
                style={{position:'relative'}}
            />
        </Grid>
    )
}


const TabBar = ({ navigationState: { index, routes } }: TabBarProps<Route>) => {
    return(
        <Grid flexDirection='row' zIndex={-1} position='absolute' width={'100%'} bottom={0} paddingHorizontal={15} backgroundColor='#fff' height={50}>
            <Grid flexDirection='row' alignItems='center' display='flex' height={'100%'}>
                {
                    routes.map((val, i) => {
                        return (
                            <Sleep key={i} active={ index === i } />
                        )
                    })
                }
            </Grid>
        </Grid> 
    )
}