import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import Store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
const app = createApp(App);

app.use(Store);
app.use(router);
app.mount('#app');