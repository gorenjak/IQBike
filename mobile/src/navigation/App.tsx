import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {useFonts} from 'expo-font';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { auth } from '../config/firebase';
import { Button, Text } from '../components/';

import Menu from './Menu';
import {useData, ThemeProvider, TranslationProvider} from '../hooks';

export default () => {
  const {isDark, theme, setTheme} = useData();

  /* set the status bar based on isDark constant */
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, [isDark]);

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'Raleway-Light': theme.assets.RalewayLight,
    'Raleway-Regular': theme.assets.RalewayRegular,
    'Raleway-SemiBold': theme.assets.RalewaySemiBold,
    'Raleway-ExtraBold': theme.assets.RalewayExtraBold,
    'Raleway-Bold': theme.assets.RalewayBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer theme={navigationTheme}>
          <Menu />
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};
