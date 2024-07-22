import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Linking, StyleSheet} from 'react-native';
import {auth} from '../config/firebase';
import useAuth from '../hooks/useAuth';

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Switch, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import SwitchLanguage from '../components/SwitchLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

type DrawerParamList = {
  Screens: undefined;
  // Define other screens if needed
};
type DrawerNavigationProps = DrawerNavigationProp<DrawerParamList, 'Screens'>;

/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent: React.FC<
  DrawerContentComponentProps<DrawerContentOptions>
> = (props) => {
  const {navigation} = props;
  const {t, setLocale} = useTranslation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;
  const {isAuthenticated} = useAuth();
  const [language, setLanguage] = useState<boolean>(true);

  const handleNavigation = useCallback(
    (to: string) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  const handleWebLink = useCallback((url: string) => Linking.openURL(url), []);

  // screen list for Drawer menu
  const screens = [
    {name: t('screens.home'), to: 'Home', icon: assets.office},
    {name: t('screens.prediction'), to: 'Prediction', icon: assets.documentation},
    {name: t('screens.profile'), to: 'Profile', icon: assets.users},
    {
      name: t('screens.subscriptions'),
      to: 'Subscriptions',
      icon: assets.articles,
    },
    {name: t('screens.signin'), to: 'SignIn', icon: assets.register},
  ];

  const filteredScreens = isAuthenticated
    ? screens.filter((screen) => screen.to !== 'SignIn')
    : screens.filter(
        (screen) =>
          screen.to !== 'Profile'
      );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await auth.signOut();
      console.log('Uporabnik je odjavljen');
    } catch (error) {
      console.log('Error occurred during logout:', error);
    }
  };

  const thumbImageOn = require('../assets/images/sl.jpg'); // Replace with the actual image source for "ON" state
  const thumbImageOff = require('../assets/images/en.png'); // Replace with the actual image source for "OFF" state

  // Function to handle language change
  const handleLanguageChange = () => {
    // Toggle between English ('en') and Slovenian ('sl') languages
    const newLocale = language ? 'sl' : 'en';
    setLocale(newLocale);
    setLanguage(!language);
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding}>
        <Button
          row
          justify="flex-start"
          onPress={() => navigation.navigate('Home')}>
          <Block
            flex={0}
            row
            align="center"
            marginTop={sizes.m}
            marginBottom={sizes.l}>
            <Image
              radius={0}
              style={styles.imageLogo}
              source={assets.logo}
              marginRight={sizes.sm}
            />
            <Block>
              <Text size={18} semibold>
                {t('app.name')}
              </Text>
            </Block>
          </Block>
        </Button>

        {filteredScreens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  style={styles.imageIcon}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        {isAuthenticated && (
          <Button
            row
            justify="flex-start"
            marginTop={sizes.s}
            marginBottom={sizes.s}
            onPress={handleLogout}>
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              width={sizes.md}
              height={sizes.md}
              marginRight={sizes.s}
              gradient={gradients.white}>
              <Image
                radius={0}
                style={styles.imageIcon}
                color={colors.black}
                source={assets.extras}
              />
            </Block>
            <Text p color={labelColor}>
              {t('menu.logout')}
            </Text>
          </Button>
        )}

        <Block row justify="space-between" marginTop={sizes.l * 5}>
          <Text semibold color={labelColor}>
            {t('darkMode')}
          </Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
            }}
          />
        </Block>
        <Block row justify="space-between" marginTop={sizes.m}>
          <Text semibold color={labelColor}>
            {t('settings.language')}
          </Text>
          <SwitchLanguage
            checked={language}
            onPress={handleLanguageChange}
            thumbImageOn={thumbImageOn}
            thumbImageOff={thumbImageOff}
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients} = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(
          props: DrawerContentComponentProps<DrawerNavigationProps>,
        ) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};

const styles = StyleSheet.create({
  imageLogo: {
    width: 33,
    height: 33,
  },
  imageIcon: {
    width: 14,
    height: 14,
  },
});
