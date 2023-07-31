import React, { useState } from 'react';
import { 
    Grid, 
    Hr, 
    Icon, 
    Modalize, 
    OutlinedInput, 
    SelectInput, 
    Typography,
    ButtomFilter
} from '../../components';
import { RoleUser, StateUser } from '../../interfaces/user';

export type FormFilterUsers = {
    dateFrom: string,
    dateTo: string,
    rol: RoleUser,
    estado: StateUser
}

interface FilterUsersProps{
    show: boolean;
    close: () => void;
    onFilter: ( formFilter: FormFilterUsers ) => void;
    filter: FormFilterUsers;
    onReset: () => void;
}

export const FilterUsers = ({
    show,
    close,
    filter,
    onFilter,
    onReset
}:FilterUsersProps) => {
    const [formObject, setFormObject] = useState(filter);


    const onChangeForm = (field: keyof typeof filter, value: string) => {
        setFormObject(values => ({
            ...values,
            [field]: value
        }))
    }

  return (
    <Modalize
        active={show}
        heightModalize='100%'
        onClose={close}
        transparent={false}
    >
        <Grid container spacing={2} isKeyboardAvoidingView KeyboardAvoidingViewProps={{behavior: 'padding'}} >
            <Grid>
                <Typography>
                    Filtra por fecha
                </Typography>
                <Grid bgColor='zumthor'  marginTop={15} paddingVertical={8} paddingHorizontal={5} borderRadius={4}>
                    <OutlinedInput 
                        value={formObject.dateFrom}
                        onChangeText={(value) => onChangeForm('dateFrom', value)}
                        labelText='Fecha desde'
                        inputStyle={{
                            borderRadius:0,
                            paddingLeft: 10,
                            height: 45,
                            paddingTop: 10,
                        }}
                        iconRight={<Icon name='calendar' size='lg' color='scorpion' />}
                        inputProps={{
                            inputMode: 'text',
                        }}
                    />
                    <Grid alignItems='flex-end'><Hr width='90%' mt={0} mb={10} height={1} bg='silverTwho'  /></Grid>
                    <OutlinedInput 
                        value={''}
                        onChangeText={(value) => onChangeForm('dateTo', value)}
                        labelText='Fecha hasta'
                        inputStyle={{
                            borderRadius:0,
                            paddingLeft: 10,
                            height: 45,
                            paddingTop: 10,
                        }}
                        iconRight={<Icon name='calendar' size='lg' color='scorpion' />}
                        inputProps={{
                            inputMode: 'text',
                        }}
                    />
                </Grid>
            </Grid>
            <Grid spacing={2}>
                <Typography>
                    Ordenar por:
                </Typography>
                <Grid>
                    <Typography size={12} fontFamily='Poppins-Medium'>
                        Rol de usuario
                    </Typography>
                    <SelectInput
                        value={formObject.rol}
                        onChangeText={({value}) => onChangeForm('rol', value) }
                        mb={0}
                        bgInput='zumthor'
                        labelText='Selecciona rol de usuario'
                        iconRight={<Icon name='chevronDownOutline' size='lg' color='scorpion' />}
                        select={{
                        value: formObject.rol,
                        placeholder:{ label: 'Seleciona rol de usuario', value: '' },
                        items: [
                            { label: 'Conductor', value: 'conductor' },
                            { label: 'Solicitante', value: 'solicitante' },
                            { label: 'Analista', value: 'analista' },
                        ]
                        }}
                   
                    />
                </Grid>
                <Grid>
                    <Typography size={12} fontFamily='Poppins-Medium'>
                        Estado de usuario
                    </Typography>
                    <SelectInput
                        value={formObject.estado}
                        onChangeText={({value}) => onChangeForm('estado', value) }
                        mb={0}
                        bgInput='zumthor'
                        labelText='Selecciona un estado'
                        iconRight={<Icon name='chevronDownOutline' size='lg' color='scorpion' />}
                        select={{
                            value: formObject.estado,
                            placeholder:{ label: 'Seleciona un estado', value: '' },
                            items: [
                                { label: 'Pendiente', value: 'pendiente' },
                                { label: 'Cancelados', value: 'cancelado' },
                                { label: 'Aprobados', value: 'aprobado' }
                            ]
                        }}
                    
                    />
                </Grid>
            </Grid>
            <ButtomFilter 
                onReset={() =>  onReset()}
                onFilter={() => onFilter(formObject)}
            />
        </Grid>
    </Modalize>
  )
}
