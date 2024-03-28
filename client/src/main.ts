/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

// const i18n = createI18n({
//   // something vue-i18n options here ...
// })

import './assets/style.css';
import './styles/index.scss';

import LatLon from 'geodesy/latlon-ellipsoidal-vincenty.js';

const p1 = new LatLon(-37.95103, 144.42487);
const dist = 54972.271;
const brng = 306.86816;
const p2 = p1.destinationPoint(dist, brng);

console.log("heloo from geodesy", p2);



const app = createApp(App)

registerPlugins(app)
app.mount('#app')
