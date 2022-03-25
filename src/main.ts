import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import './assets/fonts/asteroidhazard/style.css';
import './styles/index.scss';
import dimension from './plugins/Dimension';
import state from './plugins/state';

Vue.config.productionTip = false
Vue.use(dimension);
Vue.use(state);

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
