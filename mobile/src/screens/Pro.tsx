import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const Pro = () => {
  const [stations, setStations] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const storedStations = await AsyncStorage.getItem('nearestStations');
        if (!storedStations) {
          console.error('No stored stations found.');
          return;
        }

        const nearestStations = JSON.parse(storedStations);
        if (nearestStations.length >= 6) {
          setStations(nearestStations);
          fetchCyclingRoutes(nearestStations);
        } else {
          console.error('Insufficient data in stored stations.');
        }
      } catch (error) {
        console.error('Error loading stations from AsyncStorage:', error);
      }
    };

    loadStations();
  }, []);

  const fetchCyclingRoutes = async (stations) => {
    await Promise.all([
      fetchCyclingRoute(stations[0], stations[3]),
      fetchCyclingRoute(stations[1], stations[4]),
      fetchCyclingRoute(stations[2], stations[5]),
    ]);
  };

  const fetchCyclingRoute = async (start, end) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&mode=walking&key=${Constants.manifest?.extra?.googleApi}`
    );

    if (!response.ok) {
      console.error('Failed to fetch route from API');
      return;
    }

    const data = await response.json();
    if (data.routes && data.routes.length > 0 && data.routes[0].overview_polyline && data.routes[0].overview_polyline.points) {
      const points = data.routes[0].overview_polyline.points;
      const routeCoordinates = decodePolyline(points);
      setPolylineCoordinates((prev) => [...prev, routeCoordinates]);
    } else {
      console.error('No valid route found in API response');
    }
  };

  const decodePolyline = (encoded) => {
    let index = 0;
    const len = encoded.length;
    const polylineCoordinates = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      const point = { latitude: lat / 1e5, longitude: lng / 1e5 };
      polylineCoordinates.push(point);
    }
    return polylineCoordinates;
  };

  const handleRouteSelect = (index) => {
    setSelectedRouteIndex(index);
  };

  if (stations.length < 6) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const region = {
    latitude: (stations[0].latitude + stations[3].latitude) / 2,
    longitude: (stations[0].longitude + stations[3].longitude) / 2,
    latitudeDelta: Math.abs(stations[0].latitude - stations[3].latitude) * 2,
    longitudeDelta: Math.abs(stations[0].longitude - stations[3].longitude) * 2,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {selectedRouteIndex !== null && (
          <>
            <Marker
              coordinate={{ latitude: stations[selectedRouteIndex].latitude, longitude: stations[selectedRouteIndex].longitude }}
              title={stations[selectedRouteIndex].ime}
              description={`Napoved: ${stations[selectedRouteIndex].prediction || 'N/A'}`}
              pinColor='#FFA100'
            />
            <Marker
              coordinate={{ latitude: stations[selectedRouteIndex + 3].latitude, longitude: stations[selectedRouteIndex + 3].longitude }}
              title={stations[selectedRouteIndex + 3].ime}
              description={`Napoved: ${stations[selectedRouteIndex + 3].prediction || 'N/A'}`}
            />
            <Polyline
              coordinates={polylineCoordinates[selectedRouteIndex]}
              strokeColor={['#0073e6', '#e60000', '#33cc33'][selectedRouteIndex]}
              strokeWidth={3}
            />
          </>
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRouteIndex === 0 && styles.buttonSelected
          ]}
          onPress={() => handleRouteSelect(0)}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRouteIndex === 1 && styles.buttonSelected
          ]}
          onPress={() => handleRouteSelect(1)}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRouteIndex === 2 && styles.buttonSelected
          ]}
          onPress={() => handleRouteSelect(2)}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
    top: 100, // Move buttons lower
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 180, // Adjust height to create space between buttons
  },
  button: {
    backgroundColor: '#9EBD9C',
    opacity: 0.8,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonSelected: {
    backgroundColor: '#467A3C',
    opacity: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Pro;