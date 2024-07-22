import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {INSERT_MNENJE_MUTATION} from '../graphql/mutation';
import {Button, Text} from '../components';
import {useTheme, useTranslation} from '../hooks';
import {useNavigation} from '@react-navigation/native';

export default function ReturnOpinion() {
  const {t} = useTranslation();
  const [rating, setRating] = useState(0);
  const [insertMnenje] = useMutation(INSERT_MNENJE_MUTATION);
  const {sizes} = useTheme();
  const navigation = useNavigation();

  const oceniKolo = async () => {
    try {
      const bike_id = await AsyncStorage.getItem('bike_id');

      const result = await insertMnenje({
        variables: {
          _id: JSON.parse(bike_id),
          mnenje: rating,
        },
      });

      if (result) {
        await AsyncStorage.removeItem('bike_id');
        navigation.navigate('Home');
        console.log(
          'Mnenje je bilo uspešno vstavljeno:',
          result.data.insertMnenje,
        );
      }
    } catch (error) {
      console.error('Napaka pri vstavljanju mnenja:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 paddingHorizontal={sizes.s}>
        {t('returnopinion.ratebiketext')}
      </Text>
      <StarRating rating={rating} onChange={setRating} enableHalfStar={false} />
      <Button onPress={oceniKolo} primary>
        <Text>{t('returnopinion.ratebikebutton')}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
