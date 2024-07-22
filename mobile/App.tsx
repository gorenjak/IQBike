import React from 'react';
import './src/config/firebase';
import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import {StripeProvider} from '@stripe/stripe-react-native';
import { ApolloProvider } from '@apollo/client';
import client from './src/graphql/apolloClient'; 
import Constants from 'expo-constants';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
export default function App() {
  const publishableKey=Constants.manifest?.extra?.stripeApiKey
  return (
    <DataProvider>
      <StripeProvider publishableKey= {publishableKey}>
        <ApolloProvider client={client}>
          <AppNavigation />
        </ApolloProvider>
      </StripeProvider>
    </DataProvider>
  );
}