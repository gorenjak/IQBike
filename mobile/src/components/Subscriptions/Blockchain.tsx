import React from 'react';
import {TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {Block, Button, Text} from '../';
import {useTheme, useTranslation} from '../../hooks';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default () => {
  const {sizes, gradients} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <TouchableOpacity style={[styles.child]}>
      <Block marginTop={sizes.l} paddingHorizontal={sizes.padding}>
        <Block card row padding={sizes.padding}>
          <Block center>
            <Block flex={0} row center align="center" paddingTop={sizes.s}>
              <Text h4 semibold>
                {t('subscriptions.blockchain')}
              </Text>
            </Block>
            <Block row flex={0} center align="center" marginTop={sizes.m}>
              <Text center>{t('subscriptions.blockchaintext')}</Text>
            </Block>
            <Block row flex={0} center align="center" marginTop={sizes.m}>
              <Button
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}>
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
