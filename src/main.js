import { createApp } from 'vue';
import App from './App.vue';
import Login from './components/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import router from './router/index';
import axios from 'axios';
import { createPinia } from 'pinia';
import { saveJwksKeys } from '@/util/util';
import * as jose from 'jose';
import ganttastic from '@infectoone/vue-ganttastic'
import { loadConfig } from './config/config';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

loadConfig()
.then((config) => {
    saveJwksKeys(jose.createRemoteJWKSet(new URL("https://dev-d4tf4m1mg470mn4s.us.auth0.com/.well-known/jwks.json")));
    app.use(router);
    app.use(ganttastic)
    app.mount('#app');
});
