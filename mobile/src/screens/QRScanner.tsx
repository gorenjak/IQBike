import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text} from '../components';
import {Camera} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchStripeSubscriptionsActive} from '../hooks/useSubscription';
import {useTranslation} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {
  IZPOSOJA_KOLESA_MUTATION,
  POSTAJALISCA_S_KOLESI_QUERY,
} from '../graphql/mutation';

const QRScanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scannedData, setScannedData] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState();
  const [izposodiKolo] = useMutation(IZPOSOJA_KOLESA_MUTATION);
  const {refetch} = useQuery(POSTAJALISCA_S_KOLESI_QUERY);
  const {t} = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
    const fetchUserEmail = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        setIsSubscriptionActive(await fetchStripeSubscriptionsActive(user_id));
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleQRCodeScanned = async ({data}) => {
    if (!isScanned) {
      setScannedData(data);
      setIsScanned(true);
      console.log(isSubscriptionActive);
      console.log(data);
      if (isSubscriptionActive) {
        Alert.alert(
          t('home.confirmBikeRentTitle'),
          `${t('home.confirmBikeRent')} ${data}?`,
          [
            {
              text: t('home.cancel'),
              style: 'cancel',
            },
            {
              text: t('home.confirm'),
              onPress: () => renting(data),
            },
          ],
        );
      } else {
        Alert.alert(t('home.cantrenttitle'), `${t('home.cantrenttext')}`, [
          {
            text: t('home.cancel'),
            style: 'cancel',
          },
          {
            text: t('home.buttonproceed'),
            onPress: () => navigation.navigate('Subscriptions'),
          },
        ]);
      }
    }
  };

  const renting = async (bike) => {
    console.log('IQBike ' + bike);
    const user_email = await AsyncStorage.getItem('userEmail');
    console.log('userEmail ' + user_email);
    try {
      const result = await izposodiKolo({
        variables: {
          input: {
            bike_id: bike,
            weather: 'Sončno',
            username: user_email,
          },
        },
      });
      console.log(result);
      const {_id: rentalId, start_date, bike_id} = result.data.izposojaKolesa;
      await AsyncStorage.setItem('_id', JSON.stringify(rentalId));
      await AsyncStorage.setItem('bike_id', JSON.stringify(bike_id));
      
      await AsyncStorage.setItem('rentedBike', JSON.stringify(bike));
      await AsyncStorage.setItem('start_date', JSON.stringify(start_date));

      await refetch();

      Alert.alert(
        t('home.confirmationTitleRent'),
        t('home.confirmationMessageRent'),
        [
          {
            text: t('home.finish'),
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error during bike rental:', error);
      Alert.alert(t('home.errorTitleRent'), t('home.errorMessageRent'));
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={handleQRCodeScanned}
        type={Camera.Constants.Type.back}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default QRScanner;
