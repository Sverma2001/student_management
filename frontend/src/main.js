import { createApp } from 'vue'
import App from './App.vue'
import Store from './store/index.js';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/dist/vuetify.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
loadFonts()

const app = createApp(App);
app.use(vuetify)
app.use(Store)
app.use(router)
app.mount('#app');