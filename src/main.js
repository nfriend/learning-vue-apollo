import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App.vue';
import textQuery from './graphql/text.query.graphql';

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
      addToText: (_, { newText }, { cache }) => {
        const data = cache.readQuery({ query: textQuery });
        data.text = `${data.text} | ${newText}`;
        cache.writeData({ query: textQuery, data });
        return data.text;
      },
    },
  },
});

apolloClient.cache.writeData({
  data: {
    text: 'Hello, world!',
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
