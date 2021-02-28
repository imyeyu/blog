import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = `http://localhost:8081`;
axios.interceptors.response.use((response) => response.data, (error) => {
    throw error;
});

createApp(App).use(store).use(router).mount('#app');
