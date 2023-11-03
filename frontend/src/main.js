import { createApp } from 'vue'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import Store from './store/index.js';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.js';
import 'vuetify/dist/vuetify.css';
import router from './router';
loadFonts()

const i18n = createI18n({
    locale: 'english', // Set the default locale
    messages: {
      english: require('./locales/en.json'), // Load English translations
      french: require('./locales/fr.json'), // Load French translations
      // Add more languages as needed
    },
  });

const app = createApp(App);
app.use(vuetify)
app.use(Store)
app.use(router)
app.use(i18n)
app.mount('#app');