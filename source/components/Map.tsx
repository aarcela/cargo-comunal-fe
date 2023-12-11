import React, { useState, useEffect } from 'react';
import MapView, { Marker, MapMarkerProps, MapViewProps, Region, Polyline } from 'react-native-maps';
import MapViewDirections, { MapViewDirectionsProps } from 'react-native-maps-directions';

export interface MapMarker extends MapMarkerProps{}

interface MapProps {
    markers?: MapMarkerProps[];
    region?: Region;
    mapDirections?: MapViewDirectionsProps;
  mapViewProps?: MapViewProps;
  onMarkerDragEnd?: (directions: any) => void; // Nueva prop para manejar el evento de drag
}

export const Map = ({
    markers,
    region,
    mapDirections,
  mapViewProps,
    onMarkerDragEnd,
}: MapProps) => {
    const [mapMarkers, setMapMarkers] = useState<MapMarkerProps[]>();
    const [directon, setDirection] = useState<any[]>();
    useEffect(() => {
      setMapMarkers(markers);
    }, [markers])
    const handleMarkerDragEnd = (coordinate: any) => {
      setDirection(coordinate);
      if (onMarkerDragEnd) {
        onMarkerDragEnd(coordinate); // Llama a la función proporcionada por el padre
      }
    };
    console.log("direcctions::",directon)
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
                      draggable
                      onDragEnd={(e) => handleMarkerDragEnd(e.nativeEvent.coordinate)}

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
