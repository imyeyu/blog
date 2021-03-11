import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import httpCodeMsg from '@/static/HttpCode';

// 网络请求
axios.defaults.timeout = 8E3;
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.interceptors.response.use(response => response.data, error => {
	if (error) {
		const url = `地址：${error.config.url}`;
		if (error.response && error.response.status) {
			store.state.dialogBus.display({
				icon: 'ERROR',
				title: `错误：${error.response.status}`,
				titleSub: url,
				content: httpCodeMsg(error.response.status as number)
			});
		}
		if (error.request) {
			if (error.message.startsWith('timeout')) {
				store.state.dialogBus.display({
					icon: 'ERROR',
					title: `错误：${error.request.status}`,
					titleSub: url,
					content: `请求超时：${axios.defaults.timeout} 毫秒`
				});
			} else {
				store.state.dialogBus.display({
					icon: 'ERROR',
					title: `错误：${error.request.status}`,
					titleSub: url,
					content: error.message
				});
			}
		}
	}
	throw error;
});

// 页面路由
router.afterEach(() => window.scrollTo(0, 0));

// Vue 引擎
createApp(App).use(store).use(router).mount('#app');
