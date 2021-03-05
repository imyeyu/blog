import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.timeout = 6E3;
axios.defaults.baseURL = `http://localhost:8081`;
axios.interceptors.response.use((response) => response.data, (error) => {
	throw error;
});
router.afterEach(() => window.scrollTo(0, 0));

createApp(App).use(store).use(router).mount('#app');
