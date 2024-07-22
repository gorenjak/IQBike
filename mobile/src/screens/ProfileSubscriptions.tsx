import React, {useEffect, useState} from 'react';
import {Block, Text} from '../components/';
import {useTheme, useTranslation} from '../hooks/';
import {API_URL} from '../config/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';

const AccountSubscription = ({subscription, onCancel}) => {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  const date1 = new Date(subscription.current_period_start * 1000);
  const date2 = new Date(subscription.current_period_end * 1000);

  // Formatting options
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate1 = new Intl.DateTimeFormat('en-US', options).format(
    date1,
  );
  const formattedDate2 = new Intl.DateTimeFormat('en-US', options).format(
    date2,
  );

  const translatedStatus =
    subscription.status === 'canceled'
      ? t('subscriptions.cancelled')
      : subscription.status === 'active'
      ? t('subscriptions.active')
      : subscription.status === 'unpaid'
      ? t('subscriptions.unpaid')
      : subscription.status === 'incomplete'
      ? t('subscriptions.incomplete')
      : subscription.status;

  return (
    <Block card row padding={sizes.padding} marginTop={sizes.sm}>
      <Block>
        <Block>
          <Text h5>
            {subscription.plan.interval === 'week'
              ? t('subscriptions.weekly')
              : t('subscriptions.yearly')}
          </Text>
          <Text p>
            {t('profile.status')}: {translatedStatus}
          </Text>
          <Text p>
            {t('profile.current_period_start')}: {formattedDate1}
          </Text>
          <Text p>
            {t('profile.current_period_end')}: {formattedDate2}
          </Text>
          {subscription.status === 'active' && (
            <TouchableOpacity onPress={() => onCancel(subscription.id)}>
              <Text h5 danger>
                {t('subscriptions.cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default function ProfileSubscriptions() {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  const [subscriptions, setSubscriptions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        fetchStripeSubscriptions(user_id);
        setUserId(user_id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  async function fetchStripeSubscriptions(customerId) {
    try {
      const {subscriptions} = await fetch(
        `${API_URL}/subscriptions/` + customerId,
      ).then((r) => r.json());
      setSubscriptions(subscriptions.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Stripe subscriptions:', error);
      setLoading(false);
    }
  }

  async function cancelStripeSubscription(subscriptionId) {
    try {
      const response = await fetch(`${API_URL}/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      if (response.ok) {
        fetchStripeSubscriptions(userId);
      } else {
        console.error('Error canceling subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  }

  return (
    <Block safe>
      <Block
        scroll
        paddingVertical={sizes.l}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Block paddingHorizontal={sizes.padding}>
            {loading ? (
              <ActivityIndicator
                size="large"
                style={{marginTop: sizes.l * 3}}
              />
            ) : subscriptions.length === 0 ? (
              <Text h3 center paddingTop={sizes.l * 4}>
                {t('subscriptions.nosubscriptions')}
              </Text>
            ) : (
              subscriptions.map((subscription) => (
                <AccountSubscription
                  key={subscription.id}
                  subscription={subscription}
                  onCancel={cancelStripeSubscription}
                />
              ))
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
