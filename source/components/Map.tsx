import React from 'react';
import MapView, { Marker, MapMarkerProps, MapViewProps, Region } from 'react-native-maps';

interface MapProps {
    markers?: MapMarkerProps[];
    region?: Region;
}

export const Map = ({
    markers,
    region
}: MapProps) => {
  return (
    <MapView
        region={region}
        
        style={{flex: 1}}
    >
        {
            region &&
            <Marker 
                coordinate={{
                    latitude: region?.latitude,
                    longitude:region?.longitude,
                }}
            />
        }
       
    </MapView>
  )
}
