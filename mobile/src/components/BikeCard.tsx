import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useTheme, useTranslation} from '../hooks';
import {Block, Text, Button, Image} from './';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {
  IZPOSOJA_KOLESA_MUTATION,
  POSTAJALISCA_S_KOLESI_QUERY,
  VRACILO_KOLESA_MUTATION,
} from '../graphql/mutation';
import {fetchStripeSubscriptionsActive} from '../hooks/useSubscription';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

const BikeCard = ({
  postajalisce,
  handleCloseModal,
  isAuthenticated,
  rentedBike,
  retrieveRentedBikeId,
}) => {
  const {refetch} = useQuery(POSTAJALISCA_S_KOLESI_QUERY);
  const {t} = useTranslation();
  const {sizes, colors, gradients, assets, icons} = useTheme();
  const navigation = useNavigation();
  const [izposodiKolo] = useMutation(IZPOSOJA_KOLESA_MUTATION);
  const [vrniKolo] = useMutation(VRACILO_KOLESA_MUTATION);
  const [userEmail, setUserEmail] = useState(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        const user_email = await AsyncStorage.getItem('userEmail');
        setUserEmail(user_email);
        setIsSubscriptionActive(await fetchStripeSubscriptionsActive(user_id));
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };
    console.log(postajalisce);

    fetchUserEmail();
  }, []);

  const handleRent = (bike, userEmail) => {
    console.log(isSubscriptionActive);
    if (isSubscriptionActive) {
      Alert.alert(
        t('home.confirmBikeRentTitle'),
        `${t('home.confirmBikeRent')} ${bike.serijska_stevilka}?`,
        [
          {
            text: t('home.cancel'),
            style: 'cancel',
          },
          {
            text: t('home.confirm'),
            onPress: () => renting(bike, userEmail),
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
  };

  const renting = async (bike, userEmail) => {
    try {
      const result = await izposodiKolo({
        variables: {
          input: {
            bike_id: bike._id,
            weather: 'Sončno',
            username: userEmail,
          },
        },
      });
      console.log(result);
      const {_id: rentalId, bike_id} = result.data.izposojaKolesa;
      await AsyncStorage.setItem('_id', JSON.stringify(rentalId));
      await AsyncStorage.setItem('bike_id', JSON.stringify(bike_id));
      await AsyncStorage.setItem('rentedBike', JSON.stringify(bike));

      await refetch();

      Alert.alert(
        t('home.confirmationTitleRent'),
        t('home.confirmationMessageRent'),
        [
          {
            text: t('home.finish'),
            onPress: () => {
              retrieveRentedBikeId();
              handleCloseModal();
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

  const handleReturn = async () => {
    try {
      let id = await AsyncStorage.getItem('_id');
      let bike_id = await AsyncStorage.getItem('bike_id');
      const result = await vrniKolo({
        variables: {
          input: {
            _id: JSON.parse(id),
            bike_id: JSON.parse(bike_id),
            end_station_id: postajalisce._id,
            end_station: postajalisce.ime,
          },
        },
      });
      console.log(result);
      console.log(JSON.parse(bike_id));
      await AsyncStorage.removeItem('_id');
      await AsyncStorage.removeItem('rentedBike');
      retrieveRentedBikeId();
      handleCloseModal();
      await refetch();
      if (result.data.vraciloKolesa) {
        Alert.alert(
          t('home.returnSuccessTitle'),
          t('home.returnSuccessMessage'),
          [
            {
              text: t('home.finish'),
              onPress: () => {
                navigation.navigate('ReturnOpinion');
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error during bike return:', error);
      Alert.alert(t('home.errorTitleReturn'), t('home.errorMessageReturn'));
    }
  };

  function calculateAverage(reviews) {
    if (reviews.length === 0) {
      return null;
    }
    const sum = reviews.reduce((total, current) => total + current, 0);
    return sum / reviews.length;
  }

  return (
    <View style={styles.modalContainer}>
      <Block card>
        <ScrollView style={styles.modal}>
          <Text h4 semibold center>
            {postajalisce.ime}
          </Text>
          <Text center marginBottom={20}>
            {t('home.nofbikes')} {postajalisce.kolesaArray.length}
          </Text>
          {!rentedBike &&
            postajalisce.kolesaArray.map((bike) => (
              <Block>
                <Block
                  key={bike._id}
                  row
                  align="center"
                  center
                  marginHorizontal={isAuthenticated ? 0 : sizes.l}
                  padding={0}>
                  <Image
                    source={icons.icon}
                    style={styles.imageIcon}
                    radius={0}
                    color={colors.black}
                    marginRight={5}
                  />
                  <Text p semibold black>
                    {t('home.bike')}{' '}
                  </Text>
                  <Text p black transform="uppercase">
                    {bike.serijska_stevilka}{' '}
                  </Text>
                  {isAuthenticated && (
                    <Button
                      flex={0}
                      marginVertical={5}
                      marginHorizontal={7}
                      radius={30}
                      gradient={gradients.primary}
                      onPress={() => handleRent(bike, userEmail)}>
                      <Text white transform="uppercase" size={12}>
                        {t('home.rent')}
                      </Text>
                    </Button>
                  )}
                </Block>
                <Block align="center" marginBottom={sizes.m}>
                  <StarRatingDisplay
                    rating={calculateAverage(bike.mnenje)}
                    starSize={25}
                  />
                </Block>
              </Block>
            ))}
          {rentedBike && (
            <Block
              row
              card
              align="center"
              marginBottom={sizes.s}
              center
              outlined
              paddingVertical={isAuthenticated ? 0 : sizes.sm}
              marginHorizontal={isAuthenticated ? 0 : sizes.l}
              padding={0}>
              <Text p semibold black>
                Kolo:{' '}
              </Text>
              <Text p black transform="uppercase">
                {rentedBike.serijska_stevilka}{' '}
              </Text>
              <Button
                flex={0}
                marginVertical={5}
                marginHorizontal={7}
                radius={30}
                gradient={gradients.primary}
                onPress={() => handleReturn()}>
                <Text white transform="uppercase" size={12}>
                  {t('home.returnBike')}
                </Text>
              </Button>
            </Block>
          )}

          <Block margin={10}></Block>
        </ScrollView>
      </Block>
      <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageIcon: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    bottom: 50,
    marginBottom: 100,
  },
  modal: {
    borderRadius: 10,
    padding: 16,
    flexGrow: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BikeCard;
