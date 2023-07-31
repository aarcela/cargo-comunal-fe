import React from 'react';
import { Grid } from '../Grid';
import { TitleParagraph } from './TitleParagraph';
import { CardProfileButton } from './CardProfileButton';
import { BtnTabBar } from './BtnTabBar';
import { InterfaceStepUser } from './Interface';



interface StepProfileProps extends InterfaceStepUser {
    isAnalist: boolean;
}

export const StepProfile = ({isAnalist, objUser, setObjUser, next}: StepProfileProps) => {
    return (
        <Grid container flexDirection='column' justifyContent='center' alignItems='center' position='relative' >
            <TitleParagraph title='Perfil de Usuario' paragraph='Selecciona un perfil de usuario, que más te identifique.' />
            <CardProfileButton 
                onPress={() => setObjUser({role: 'conductor'})} 
                title='Conductor' 
                paragraph='Encargado de recibir solicitudes de viajes según la carga.' 
                typeBtn='driver' 
                isSelect={ objUser.role == 'conductor' ? true : false }
            />
            <CardProfileButton 
                onPress={() => setObjUser({role: 'solicitante'})} 
                title='Solicitante' 
                paragraph='Encargado de hacer solicitudes de viajes según la carga.' 
                typeBtn='applicant'
                isSelect={ objUser.role == 'solicitante' ? true : false } 
            />
            { isAnalist && 
                <CardProfileButton
                    onPress={() => setObjUser({role: 'analista'})}  
                    title='Analista' 
                    paragraph='Encargado de ver reportes, asignar conductores en caso de que no se haya realizado.' 
                    typeBtn='analyst'
                    isSelect={ objUser.role == 'analista' ? true : false } 
                /> 
            }
            <BtnTabBar onNext={() => objUser.role != 'administrador' && next('personal')} /> 
        </Grid>
  )
}
