import store from '@/store/index';

/**
 * 等待加载会话弹窗
 *
 * 示例：
 * store.loader.run(async () => {
 *     // 一些长时间操作
 * });
 *
 */
export default class Loader {

	public async run(callback: () => void, errorCallback: (error: any) => void = () => {}) {
		store.state.dialogBus.display({ isLoading: true, title: '加载中' });
		try {
			await callback();
		} catch (error) {
			console.log('err', error);
			await errorCallback(error);
		}
		store.state.dialogBus.isLoading = false;
	}
}
