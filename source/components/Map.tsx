import React, { useState, useEffect } from 'react';
import MapView, { Marker, MapMarkerProps, MapViewProps, Region, Polyline } from 'react-native-maps';
import MapViewDirections, { MapViewDirectionsProps } from 'react-native-maps-directions';

export interface MapMarker extends MapMarkerProps{}

interface MapProps {
    markers?: MapMarkerProps[];
    region?: Region;
    mapDirections?: MapViewDirectionsProps;
    mapViewProps?: MapViewProps;
}

export const Map = ({
    markers,
    region,
    mapDirections,
    mapViewProps
}: MapProps) => {
    const [mapMarkers, setMapMarkers] = useState<MapMarkerProps[]>();
    
    useEffect(() => {
      setMapMarkers(markers);
      
    }, [markers])
    
    
  return (
    <MapView
        {...mapViewProps}
        region={region}
        style={{flex: 1}}
    >
        {
            mapMarkers &&            
            mapMarkers.map((item, index) => (
                <Marker 
                    key={index}
                    {...item}
                />
            ))
        }
        {
           /* mapDirections &&
            <MapViewDirections 
                {...mapDirections}
            />*/
        }
       
    </MapView>
  )
}
