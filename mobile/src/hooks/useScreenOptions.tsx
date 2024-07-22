import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import useAuth from '../hooks/useAuth';


import {useTranslation} from './useTranslation';

import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from './useTheme';
import Button from '../components/Button';
import Block from '../components/Block';
import Input from '../components/Input';

export default () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {icons, colors, sizes} = useTheme();
  const {isAuthenticated} = useAuth();

  const handleProfileButtonPress = () => {
    const {navigate} = navigation;
    if (isAuthenticated) {
      navigate('Profile');
    } else {
      navigate('SignIn');
    }
  };

  const menu = {
    headerTransparent: true,
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

    headerTitle: () => null,
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={handleProfileButtonPress}>
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <Image
            source={icons.user}
            radius={0}
            color={colors.icon}
            style={styles.imageIcon}
          />
        </Block>
      </TouchableOpacity>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => null,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    pro: {
      ...menu,
      headerTransparent: true,
      headerTitle: () => null,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            style={styles.imageBack}
            color={colors.icon}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image
            radius={0}
            style={styles.imageBack}
            color={colors.icon}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },
    receipts: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            style={styles.imageBack}
            color={colors.icon}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },
    notifications: {
      ...menu,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            style={styles.imageBack}
            color={colors.black}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
      headerRight: () => null,
      headerTitle: () => null,
    },
    prediction: {
      ...menu,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image source={icons.menu} radius={0} color={colors.black} />
        </Button>
      ),
      headerRight: () => null,
      headerTitle: () => null,
    },
    settings: {
      ...menu,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image
            radius={0}
            style={styles.imageBack}
            color={colors.black}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleProfileButtonPress}>
          <Block row flex={0} align="center" marginRight={sizes.padding}>
            <Image
              source={icons.user}
              radius={0}
              color={colors.icon}
              style={styles.imageIcon}
            />
          </Block>
        </TouchableOpacity>
      ),
      headerTitle: () => null,
    },
    scan: {
      ...menu,
      headerLeft: () => (
        <Button
          row
          flex={0}
          justify="flex-start"
          onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            color={colors.white}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
          <Text p white marginLeft={sizes.s}>
            {t('common.goBack')}
          </Text>
        </Button>
      ),
      headerRight: () => null,
      headerTitle: () => null,
    },
    subscriptions: {
      ...menu,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image
            radius={0}
            style={styles.imageBack}
            color={colors.black}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
      headerRight: () => null,
      headerTitle: () => null,
    },
  };
  const styles = {
    imageBack: {
      width: 10,
      height: 18,
    },
    imageIcon: {
      width: sizes.m,
      height: sizes.m,
    },
  };

  return options;
};
