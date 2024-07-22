import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Home,
  Profile,
  SignUp,
  SignIn,
  QRScanner,
  Subscriptions,
  ForgotPassword,
  Pro,
  ReturnOpinion,
  Prediction,
  ProfileSubscriptions,
  ProfileReceipts,
  ProfileMyJourneys,
  ProfileDataProtection,
  ProfileLegalNotice,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen
        name="Prediction"
        component={Prediction}
        options={screenOptions.prediction}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        options={screenOptions.scan}
      />

      <Stack.Screen
        name="ReturnOpinion"
        component={ReturnOpinion}
        options={screenOptions.receipts}
      />

      <Stack.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={screenOptions.subscriptions}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileDataProtection"
        component={ProfileDataProtection}
        options={screenOptions.receipts}
      />
      <Stack.Screen
        name="ProfileLegalNotice"
        component={ProfileLegalNotice}
        options={screenOptions.receipts}
      />
      <Stack.Screen
        name="ProfileSubscriptions"
        component={ProfileSubscriptions}
        options={screenOptions.pro}
      />
      <Stack.Screen
        name="ProfileReceipts"
        component={ProfileReceipts}
        options={screenOptions.receipts}
      />
      <Stack.Screen
        name="ProfileMyJourneys"
        component={ProfileMyJourneys}
        options={screenOptions.receipts}
      />
    </Stack.Navigator>
  );
};
