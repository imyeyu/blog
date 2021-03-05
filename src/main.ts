import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.timeout = 8E3;
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.interceptors.response.use((response) => response.data, (error) => {
	throw error;
});
router.afterEach(() => window.scrollTo(0, 0));

createApp(App).use(store).use(router).mount('#app');
