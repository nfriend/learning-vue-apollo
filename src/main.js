import Vue from 'vue';
import App from './components/App.vue';
import { apolloProvider } from './graphql/getProvider';
import './assets/tailwind.css';

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
