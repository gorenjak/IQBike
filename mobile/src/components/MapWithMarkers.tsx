import React, {useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Text1 from './Text';
import ScanButton from './ScanButton';
import {useTranslation} from '../hooks';
import useAuth from '../hooks/useAuth';
const MapWithMarkers = ({
  handleMarkerPress,
  postajalisca,
  rentedBike,
}) => {
  const mapRef = useRef();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {isAuthenticated} = useAuth();

  const handlePress = () => {
    if (isAuthenticated) {
      navigation.navigate('QRScanner');
    } else {
      console.log("User is not authenticated. Please log in first.");
      return Alert.alert(
        t('alert.notauthtitle'),
        t('alert.notauthtext'),
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: t('alert.gosignin'),
            onPress: () => navigation.navigate('SignIn'),
          },
          {
            text: t('alert.gologin'),
            onPress: () => navigation.navigate('SignUp'),
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.map}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 46.5547,
          longitude: 15.6459,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {postajalisca.map((postajalisce) => (
          <Marker
            key={postajalisce._id}
            coordinate={{
              latitude: postajalisce.latitude,
              longitude: postajalisce.longitude,
            }}
            onPress={() => handleMarkerPress(postajalisce)}>
            <ImageBackground
              source={require('../assets/images/pin.png')}
              style={styles.markerImage}>
              <Text style={styles.markerText}>
                {postajalisce.kolesaArray.length}
              </Text>
            </ImageBackground>
          </Marker>
        ))}
      </MapView>
      {rentedBike && (
        <TouchableOpacity style={styles.rentedBike}>
          <Text1 h5 center tertiary>
            {t('home.rentedbike')}
          </Text1>
          <Text1 h5 center tertiary bold>
            {rentedBike.serijska_stevilka}
          </Text1>
        </TouchableOpacity>
      )}
      <ScanButton onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 20,
  },
  rentedBike: {
    backgroundColor: 'orange',
    position: 'absolute',
    top: 100,
    left: 50,
    right: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 80,
  },
  markerImage: {
    width: 30,
    height: 40,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: '#e7e7e7',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default MapWithMarkers;
