import React, {useEffect, useState} from 'react';
import {API_URL} from '../config/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block, Text} from '../components';
import {useTheme, useTranslation} from '../hooks';
import {ActivityIndicator} from 'react-native';

function unixTimestampToDate(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return date.toLocaleDateString('sl-SI', options);
}

const Receipt = ({receipt}) => {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  const date = unixTimestampToDate(receipt.effective_at);

  return (
    <Block card row padding={sizes.padding} marginTop={sizes.sm}>
      <Block>
        <Block>
          <Text>
            {t('receipts.receiptnumber')}: {receipt.number}
          </Text>
          <Text>
            {t('receipts.date')}: {date}
          </Text>
          <Text>
            {t('receipts.amountpaid')}: {receipt.amount_paid / 100} EUR
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

const ProfileReceipts = () => {
  const {t} = useTranslation();
  const [receipts, setReceipts] = useState([]);
  const {sizes} = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        fetchReceipts(user_id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  async function fetchReceipts(user_id) {
    try {
      const {receipts} = await fetch(`${API_URL}/get-receipts/` + user_id).then(
        (r) => r.json(),
      );
      setReceipts(receipts.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching receipts:', error);
      setLoading(false);
    }
  }

  return (
    <Block safe>
      <Block
        scroll
        paddingVertical={sizes.l}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={1}>
          <Block paddingHorizontal={sizes.padding}>
            {loading ? ( // Check loading state
              <ActivityIndicator
                size="large"
                style={{marginTop: sizes.l * 3}}
              />
            ) : receipts.length === 0 ? (
              <Text h3 center paddingTop={sizes.l * 4}>
                {t('receipts.noreceipt')}
              </Text>
            ) : (
              receipts.map((receipt) => (
                <Receipt key={receipt.id} receipt={receipt} />
              ))
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ProfileReceipts;
