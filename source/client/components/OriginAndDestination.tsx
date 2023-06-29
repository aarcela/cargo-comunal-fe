import React, { useState } from 'react'
import { 
    Grid, 
    Icon, 
    OutlinedInput,
    GoogleAutocomplete,
    GoogleAutocompleteModal,
    GoogleAutocompleteModalType
} from '../../components';
import { DataLocationGooglePlace } from '../../interfaces/googleMap';
import { UbicationDestination, UbicationOrigin } from '../../interfaces/shipment';

interface OriginAndDestinationProps {
    bg?: 'default' | 'white';
    origin: UbicationOrigin | null;
    destination: UbicationDestination | null;
    onChangeMap: (type: 'origin' | 'destination', data: DataLocationGooglePlace | null) => void;
}

export const OriginAndDestination = ({
    bg = 'default',
    onChangeMap,
    destination,
    origin
}: OriginAndDestinationProps) => {
    const [widthContainer, setWidthContainer] = useState(0);

    const [googleAutocomple, setGoogleAutocomple] = useState<GoogleAutocompleteModal>({
        show: false,
        type: 'origin'
    });

    const [type, setType] = useState<GoogleAutocompleteModalType>('origin');
    const [show, setShow] = useState<boolean>(false);

    return (
        <Grid 
            bgColor={bg == 'default' ? 'zumthor' : 'white'} 
            display='flex' 
            flexDirection='row' 
            position='relative' 
            paddingVertical={15} 
            borderRadius={5} 
            propsExtras={{onLayout: (event) => setWidthContainer(event.nativeEvent.layout.width)}}
            shadowColor='rgb(0,0,0, 0.80)'
            shadowOffset={{
                width: 15,
                height: 10,
            }}
            elevation={bg == 'white' ? 14 : 0}
        >
            <Grid paddingHorizontal={10} alignItems='center' justifyContent='center'>
                <Grid height={20} width={20} marginBottom={-1} display='flex' alignItems='center' justifyContent='center' bgColor='royalBlue' borderRadius={15}>
                <Grid height={5} width={5} borderRadius={5} bgColor='white' />
                </Grid>
                <Grid height={35} width={3}  bgColor='gray' opacity={0.5} borderRadius={4} />
                <Grid height={20} width={20} marginTop={-1} display='flex' alignItems='center' justifyContent='center' bgColor='treePoppy' borderRadius={15}>
                <Grid height={5} width={5} borderRadius={5} bgColor='white' />
                </Grid>
            </Grid>
            <Grid width={ widthContainer > 0 ? widthContainer - 40 : 'auto' }>
                
                <OutlinedInput 
                value={origin != null ? origin.description : ''}
                onChangeText={(value) => null}
                labelText='Ubicación origen'
                inputOnButton={() => {
                    setShow(true)
                    setType('origin');
                }}
                inputStyle={{
                    borderRadius:0,
                    borderBottomWidth: 1,
                    borderColor: '#C8C8C8',
                    paddingLeft: 10,
                    height: 45,
                    paddingTop: 10
                }}
                iconRight={<Icon name='locationOutline' size='lg' color='scorpion' />}
                />
                <OutlinedInput 
                    value={destination != null ? destination.description : ''}
                    onChangeText={(value) => null}
                    inputOnButton={() => {
                        setShow(true)
                        setType('destination');
                    }}
                    mb={0}
                    labelText='Ubicación destino'
                    iconRight={<Icon name='locationOutline' size='lg' color='scorpion' />}
                    inputStyle={{
                        paddingLeft: 10,
                        height: 45,
                        paddingTop: 10
                    }}
                />
            </Grid>
            <GoogleAutocomplete
                show={show}
                type={type}
                value={
                    type == 'origin' && origin != null ? origin.description :
                    type == 'origin' && origin == null ? '' :
                    type == 'destination' && destination != null ? destination.description :
                    type == 'destination' && destination == null ? '' : ''
                }
                onClose={() => setShow(false)}
                placeholder={ 
                    type == 'origin' ? 
                    'Ingrese la ubicación origen' : 
                    'Ingrese la ubicación destino' 
                }
                onSendData={(type, data) => {
                    onChangeMap(type, data);
                }}
            />
        </Grid>
    )
}
