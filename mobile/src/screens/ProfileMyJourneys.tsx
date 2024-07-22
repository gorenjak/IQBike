import React, {useEffect, useState} from 'react';
import {Block, Text} from '../components';
import {useTheme, useTranslation} from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchIzposoje} from '../graphql/functions';
import {ActivityIndicator} from 'react-native';

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('sl-SI', options);
}

const Journey = ({journey}) => {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  const start_date = formatDate(journey.start_date);
  return (
    <Block card padding={sizes.padding} marginTop={sizes.sm}>
      <Block row>
        <Block flex={0.4} style={{borderRightWidth: 1, borderColor: 'gray'}}>
          <Text h4 center>
            {Math.abs(journey.duration / 60).toFixed(0)} min
          </Text>
          <Text p center>
            {start_date}
          </Text>
        </Block>
        <Block flex={1} paddingLeft={sizes.s}>
          <Text p>
            {t('myjourneys.startstation')}:{' '}
            <Text bold>{journey.start_station}</Text>
          </Text>
          <Text p>
            {t('myjourneys.endstation')}:{' '}
            <Text bold>{journey.end_station}</Text>
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default function ProfileMyJourneys() {
  const [journeys, setJourneys] = useState([]);
  const {sizes} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        fetchIzposojeKoles(userEmail);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  async function fetchIzposojeKoles(userEmail) {
    try {
      const data = await fetchIzposoje({
        username: userEmail,
      });
      setJourneys(data.data.izposojeForUser);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching izposoje:', error);
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
        <Block flex={0}>
          <Block paddingHorizontal={sizes.padding}>
            {loading ? (
              <ActivityIndicator
                size="large"
                style={{marginTop: sizes.l * 3}}
              />
            ) : journeys.length === 0 ? (
              <Text h3 center paddingTop={sizes.l * 4}>
                {t('myjourneys.nojourneys')}
              </Text>
            ) : (
              journeys.map((journey) => (
                <Journey key={journey._id} journey={journey} />
              ))
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
