import React, { useState } from 'react'
import { Grid, Icon, OutlinedInput } from '../../components'

export const OriginAndDestination = () => {
    const [widthContainer, setWidthContainer] = useState(0);
    return (
        <Grid 
            bgColor='zumthor' 
            display='flex' 
            flexDirection='row' 
            position='relative' 
            paddingVertical={15} 
            borderRadius={5} 
            propsExtras={{onLayout: (event) => setWidthContainer(event.nativeEvent.layout.width)}}
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
                value={''}
                onChangeText={(value) => console.log(value)}
                labelText='Ubicación origen'
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
                    value={''}
                    onChangeText={(value) => console.log(value)}
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
        </Grid>
    )
}
