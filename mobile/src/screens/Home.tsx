import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Location from 'expo-location';
import BikeCard from '../components/BikeCard';
import MapWithMarkers from '../components/MapWithMarkers';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@apollo/client';
import {POSTAJALISCA_S_KOLESI_QUERY} from '../graphql/mutation';
import {Bike, Postajalisce} from '../components/Postajalisce';
import {useIsFocused} from '@react-navigation/native';
import {Text} from '../components';
import { useTheme } from '../hooks';
import Constants from 'expo-constants';

const Home = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPostajalisce, setSelectedPostajalisce] =
    useState<Postajalisce | null>(null);
  const {isAuthenticated} = useAuth();
  const [rentedBike, setRentedBike] = useState<Bike | null>(null);
  const {data} = useQuery(POSTAJALISCA_S_KOLESI_QUERY);
  var postajalisca = data ? data.postajalisca : [];
  const isFocused = useIsFocused();
  const {sizes} = useTheme();

  const handleMarkerPress = (postajalisce: Postajalisce) => {
    setSelectedPostajalisce(postajalisce);
  };

  useEffect(() => {
    console.log("Link" + Constants.manifest?.extra?.graphqlUrl);
    if (isFocused) {
      retrieveRentedBikeId();
    }
    (async () => {
      try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        retrieveRentedBikeId();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isFocused]);

  const retrieveRentedBikeId = async () => {
    try {
      const storedRentedBike = await AsyncStorage.getItem('rentedBike');
      if (storedRentedBike !== null) {
        const parsedBike = JSON.parse(storedRentedBike);
        setRentedBike(parsedBike);
      }

      if (storedRentedBike == null) {
        setRentedBike(null);
      }
    } catch (error) {
      console.error('Error retrieving rented bike:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPostajalisce(null);
  };

  return (
    <View style={styles.container}>
      <MapWithMarkers
        handleMarkerPress={handleMarkerPress}
        postajalisca={postajalisca}
        rentedBike={rentedBike}
      />
      {selectedPostajalisce && (
        <BikeCard
          postajalisce={selectedPostajalisce}
          handleCloseModal={handleCloseModal}
          isAuthenticated={isAuthenticated}
          rentedBike={rentedBike}
          retrieveRentedBikeId={retrieveRentedBikeId}
        />
      )}
      {errorMsg && (
        <Text marginTop={sizes.m} style={styles.errorText}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 16,
    color: 'red',
  }
});

export default Home;
