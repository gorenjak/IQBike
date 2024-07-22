import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Swiper from '../components/Swiper';
import {Block, Text} from '../components';
import {useTheme, useTranslation} from '../hooks';

export default function Subscriptions() {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  return (
    <View style={styles.container}>
      <Block style={styles.block}>
        <Text h4 bold center marginBottom={sizes.sm}>
          {t('subscriptions.subtitle')}
        </Text>
        <Text center marginBottom={sizes.sm} paddingHorizontal={10}>
          {t('subscriptions.text')}
        </Text>
      </Block>
      <Swiper></Swiper>
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1},
  block: {marginTop: 150},
});
