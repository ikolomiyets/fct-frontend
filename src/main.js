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
    saveJwksKeys(jose.createRemoteJWKSet(new URL(config.jwks_url)));
    app.use(router);
    app.use(ganttastic)
    app.mount('#app');
});
