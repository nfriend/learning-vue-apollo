import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { addToTextResolver } from './resolvers/add_to_text';

Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://gitlab.com/api/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers: {
    Mutation: {
      addToText: addToTextResolver,
    },
  },
});

apolloClient.cache.writeData({
  data: {
    text: 'Hello, world!',
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
