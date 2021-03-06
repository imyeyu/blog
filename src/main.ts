import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import httpCodeMsg from '@/static/HttpCode';

// 网络请求
axios.defaults.timeout = 8E3;
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.withCredentials = true;
// 全局请求事件
axios.interceptors.request.use(config => {
	store.state.isLoadingError = false;
	if (store.state.signedInUser) {
		config.headers = { 'TOKEN': (store.state.signedInUser as any).token };
	}
	return config;
}, error => {
	return Promise.reject(error);
});
// 全局返回事件
axios.interceptors.response.use(response => {
	// 服务端返回
	const data = response.data;
	if (data.code < 40000) { // 200 或 300 HTTP 状态段视为成功
		return data.data;
	} else {
		store.state.isLoadingError = true;
		// 返回错误
		store.state.dialogBus.display({
			icon: 'ERROR',
			title: `错误：${data.code}`,
			titleSub: response.config.url,
			content: data.msg
		});
	}
	return null;
}, error => {
	store.state.isLoadingError = true;
	// 请求错误
	if (error) {
		const url = `地址：${error.config.url}`;
		if (error.response && error.response.status) {
			store.state.dialogBus.display({
				icon: 'ERROR',
				title: `错误：${error.response.status}`,
				titleSub: url,
				content: httpCodeMsg(error.response.status as number)
			});
			throw error;
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
