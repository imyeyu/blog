/**
 * // 注册
 * Events.register("eventName", () => {
 *     // 触发执行
 * });
 * 
 * // 触发
 * Events.emit("eventName");
 * 
 */
export default class Events {

	// 监听数组
	private static listeners: any = {};

	/**
	 * 注册事件
	 * 
	 * @param name     事件名称
	 * @param callback 回调函数
	 */
	public static register(name: string, callback: Function) {
		const observers: Observer[] = Events.listeners[name];
		if (!observers) {
			Events.listeners[name] = [];
		}
		Events.listeners[name].push(new Observer(callback, name));
	}

	/**
	 * 重置并注册
	 * 
	 * @param name     事件名称
	 * @param callback 回调函数
	 */
	public static reset(name: string, callback: Function) {
		Events.listeners[name] = [];
		this.register(name, callback);
	}

	/**
	 * 移除事件
	 * 
	 * @param name     事件名称
	 * @param callback 回调函数
	 */
	public static remove(name: string, callback: Function) {
		const observers: Observer[] = Events.listeners[name];
		if (!observers) {
			return 'remove';
		}
		for (let i = 0, l = observers.length; i < l; i++) {
			if (observers[i].compar(name)) {
				// 移除
				observers.splice(i, 1);
				break;
			}
		}
		if (observers.length === 0) {
			delete Events.listeners[name];
		}
	}

	/**
	 * 触发事件
	 * 
	 * @param name 事件名称
	 * @param args 参数
	 */
	public static emit(name: string, ...args: any[]) {
		const observers: Observer[] = Events.listeners[name];
		if (!observers) {
			return 'emit';
		}
		for (const observer of observers) {
			// 通知
			observer.notify(...args);
		}
	}
}

/** 观察者 */
class Observer {

	private callback: Function = () => {}; // 回调函数
	private name: any = null;

	constructor(callback: Function, name: any) {
		this.callback = callback;
		this.name = name;
	}

	/**
	 * 发送通知
	 * 
	 * @param args 不定参数
	 */
	notify(...args: any[]): void {
		this.callback.call(this.name, ...args);
	}

	compar(name: any): boolean {
		return name === this.name;
	}
}