import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Importing the fetch function
import { fetchBliznjaPostajalisca } from '../graphql/functions';

const Prediction = () => {
  const navigation = useNavigation();
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [nearestStations, setNearestStations] = useState([]);

  useEffect(() => {
    // Load saved stations from AsyncStorage on component mount
    loadSavedStations();
  }, []);

  const loadSavedStations = async () => {
    try {
      const storedStations = await AsyncStorage.getItem('nearestStations');
      if (storedStations) {
        setNearestStations(JSON.parse(storedStations));
      }
    } catch (error) {
      console.error('Error loading stations from AsyncStorage:', error);
    }
  };

  const saveStationsToStorage = async (stations) => {
    try {
      await AsyncStorage.setItem('nearestStations', JSON.stringify(stations));
    } catch (error) {
      console.error('Error saving stations to AsyncStorage:', error);
    }
  };

  const handlePredictionRequest = async () => {
    const predictionUrl = Constants.manifest?.extra?.predictionUrl;
    const googleApi = Constants.manifest?.extra?.googleApi;

    // Preverjanje, ali so vsi podatki vnešeni
    if (!startLocation || !endLocation || !startDate) {
      Alert.alert('Vsi podatki morajo biti vnešeni');
      return;
    }

    try {
      // Pošiljanje GET zahtevka za pridobitev koordinat za začetno lokacijo
      const startResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: startLocation,
          key: googleApi
        }
      });

      // Pošiljanje GET zahtevka za pridobitev koordinat za končno lokacijo
      const endResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: endLocation,
          key: googleApi
        }
      });

      // Preverjanje, ali je bila vrnjena pravilna struktura odgovora
      if (startResponse.data.results.length === 0 || endResponse.data.results.length === 0) {
        throw new Error('Ni bilo mogoče najti koordinat za vnesene lokacije');
      }

      const startLatLng = startResponse.data.results[0].geometry.location;
      const endLatLng = endResponse.data.results[0].geometry.location;

      console.log('Start location:', startLatLng);
      console.log('End location:', endLatLng);

      // Fetch nearest stations
      const nearestStationsStartResponse = await fetchBliznjaPostajalisca({
        latitude: startLatLng.lat,
        longitude: startLatLng.lng,
      });

      const nearestStationsEndResponse = await fetchBliznjaPostajalisca({
        latitude: endLatLng.lat,
        longitude: endLatLng.lng,
      });

      const nearestStationsStart = nearestStationsStartResponse?.data?.nearestPostajalisce || [];
      const nearestStationsEnd = nearestStationsEndResponse?.data?.nearestPostajalisce || [];

      const allNearestStations = [...nearestStationsStart, ...nearestStationsEnd];
      console.log('Nearest stations:', allNearestStations);

      // Calculate prediction for each station
      const stationsWithPrediction = await Promise.all(
        allNearestStations.map(async (station) => {
          try {
            const predictionData = {
              datum: startDate,
              latitude: station.latitude,
              longitude: station.longitude,
            };
            
            // Perform POST request to predictionUrl with predictionData
            const predictionResponse = await axios.post(predictionUrl, predictionData);
            const predictionValue = predictionResponse.data.prediction;

            console.log(`Prediction for station ${station.ime}:`, predictionValue);

            return {
              ...station,
              prediction: predictionValue,
            };
          } catch (error) {
            console.error(`Error calculating prediction for station ${station.ime}:`, error);
            return {
              ...station,
              prediction: null,
            };
          }
        })
      );

      // Save stations with predictions to AsyncStorage
      await saveStationsToStorage(stationsWithPrediction);

      // Update state with stations including predictions
      setNearestStations(stationsWithPrediction);

      // Navigate to 'Pro' screen upon successful prediction request
      navigation.navigate('Pro');
    } catch (error) {
      console.error('Napaka pri pridobivanju koordinat:', error.message);
      Alert.alert('Napaka pri pošiljanju zahtevka', error.message);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const newDate = new Date(startDate);
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setStartDate(newDate);
    console.log('Selected date:', newDate);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const newTime = new Date(startDate);
    newTime.setHours(time.getHours(), time.getMinutes());
    setStartDate(newTime);
    console.log('Selected time:', newTime);
    hideTimePicker();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.label}>Izberi začetno točko</Text>
          <TextInput
            style={styles.input}
            placeholder="Začetna lokacija"
            placeholderTextColor="#467A3C"
            value={startLocation}
            onChangeText={text => setStartLocation(text)}
          />
          <Text style={[styles.label, { marginTop: 20 }]}>Izberi ciljno točko</Text>
          <TextInput
            style={styles.input}
            placeholder="Končna lokacija"
            placeholderTextColor="#467A3C"
            value={endLocation}
            onChangeText={text => setEndLocation(text)}
          />
          <Text style={[styles.label, { marginTop: 20 }]}>Izberi čas in datum</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
              <Text style={styles.dateText}>
                {startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimePicker} style={[styles.dateButton, { marginRight: 0 }]}>
              <Text style={styles.dateText}>
                {startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            display="spinner"
            customStyles={{
              datePicker: {
                backgroundColor: '#1C1C1C',
                borderRadius: 10,
              },
              datePickerText: {
                color: '#467A3C', // Spremenjena barva
              },
              header: {
                backgroundColor: '#9bc88b',
              },
              textColor: {
                color: '#467A3C', // Spremenjena barva
              },
            }}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            display="spinner"
            customStyles={{
              datePicker: {
                backgroundColor: '#1C1C1C',
                borderRadius: 10,
              },
              datePickerText: {
                color: '#467A3C', // Spremenjena barva
              },
              header: {
                backgroundColor: '#9bc88b',
              },
              textColor: {
                color: '#467A3C', // Spremenjena barva
              },
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handlePredictionRequest}>
            <Text style={styles.buttonText}>POKAŽI POTI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1C1C1C',
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#9bc88b',
    width: 310, // Povečano na 310, da se ujema z vnosnimi polji
    textAlign: 'left',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 14,
    width: 310,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9bc88b',
    marginTop: 10,
    color: '#467A3C',
    backgroundColor: '#1C1C1C',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    width: 310, // Povečano na 310, da se ujema z vnosnimi polji
  },
  dateButton: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9bc88b',
    backgroundColor: '#1C1C1C',
  },
  dateText: {
    color: '#467A3C', // Enaka barva kot v vnosnih poljih
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 310,
    height: 39,
    backgroundColor: '#447352',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Prediction;