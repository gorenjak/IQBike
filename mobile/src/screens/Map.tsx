import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';


interface MapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: {
    id: number;
    title: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  }[];
}

const Map: React.FC<MapProps> = ({initialRegion, markers}) => {
  return (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} initialRegion={initialRegion}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
