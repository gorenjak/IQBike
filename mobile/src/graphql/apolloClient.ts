import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const httpLink = new HttpLink({
  uri: Constants.manifest?.extra?.graphqlUrl,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});

export default client;
