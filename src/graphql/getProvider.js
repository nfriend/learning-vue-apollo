import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
} from '@apollo/client/core';
import { resolvers } from './resolvers/index';
import { typeDefs } from './typeDefs.graphql';
import { typePolicies } from './getTypePolicies';
import allLocalDataQuery from './queries/allLocalData.query.graphql';

Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://gitlab.com/api/graphql',
});

// Cache implementation
const cache = new InMemoryCache({ typePolicies });

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

apolloClient.writeQuery({
  query: allLocalDataQuery,
  data: {
    text: 'Hello, world!',
    date: new Date(),
    complex: {
      hello: {
        world: '!',
      },
    },
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
