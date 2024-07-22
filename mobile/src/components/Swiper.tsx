import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import Yearly from './Subscriptions/Yearly';
import Weekly from './Subscriptions/Weekly';
import Blockchain from './Subscriptions/Blockchain';

const {width, height} = Dimensions.get('window');

export default () => {
  const scrollRef = React.useRef(null);
  return (
    <SwiperFlatList
      showPagination
      paginationStyle={styles.pagination}
      ref={scrollRef}>
      <Yearly></Yearly>
      <Weekly></Weekly>
      <Blockchain></Blockchain>
    </SwiperFlatList>
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
  pagination: {
    marginBottom: 80,
  },
});
