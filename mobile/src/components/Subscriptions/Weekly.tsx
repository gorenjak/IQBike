import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Dimensions, StyleSheet, Alert} from 'react-native';
import {Block, Button, Text} from '../';
import {useTheme, useTranslation} from '../../hooks';
import {useStripe} from '@stripe/stripe-react-native';
import {API_URL} from '../../config/server';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default () => {
  const {sizes, gradients} = useTheme();
  const {t} = useTranslation();
  const stripe = useStripe();
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        setUserId(user_id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handlePress = async (customerId, priceId) => {
    try {
      console.log(customerId);
      const response = await fetch(`${API_URL}/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          priceId,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        if (
          data.error &&
          data.error.message === 'Customer already has an active subscription.'
        ) {
          return Alert.alert(
            t('alert.alreadysubscribedtitle'),
            t('alert.alreadysubscribedtext'),
            [
              {
                text: 'OK',
              },
            ],
            {cancelable: false},
          );
        } else {
          return Alert.alert(
            t('alert.notauthtitle'),
            t('alert.notauthtext'),
            [
              {
                text: 'OK',
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
      }

      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'IQBike',
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      const response1 = await fetch(`${API_URL}/default-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
        }),
      });
      const data1 = await response1.json();
      console.log(data1);
      Alert.alert(t('alert.paymentcomplete'));
    } catch (err) {
      console.error(err);
      Alert.alert(t('alert.errorpayment'));
    }
  };

  return (
    <TouchableOpacity style={[styles.child]}>
      <Block marginTop={sizes.l} paddingHorizontal={sizes.padding}>
        <Block card row padding={sizes.padding}>
          <Block center>
            <Block flex={0} row center align="center" paddingTop={sizes.s}>
              <Text h4 semibold>
                {t('subscriptions.weekly')}
              </Text>
            </Block>
            <Block row flex={0} center align="center" marginTop={sizes.m}>
              <Text center>{t('subscriptions.weeklytext')}</Text>
            </Block>
            <Block row flex={0} center align="center" marginTop={sizes.m}>
              <Button
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                onPress={() =>
                  handlePress(userId, 'price_1NYz1SIKI4pDhLQaDDXUwPy8')
                }>
                <Text bold white transform="uppercase">
                  {t('subscriptions.button')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  child: {
    height: height * 0.4,
    width,
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 25,
    textAlign: 'center',
  },
});
