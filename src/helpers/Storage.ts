/**
 * 浏览器本地配置
 */
export default class Storage {

	private storage: any;

	constructor() {
		this.load();
	}

	/** 获取 */
	public get(key: string) {
		return this.storage[key];
	}

	/** 设置 */
	public set(key: string, value: any) {
		this.storage[key] = value;
		this.write();
	}

	/** 写入所有配置 */
	public write() {
		localStorage.setItem('storage', JSON.stringify(this.storage));
	}

	/** 读取所有配置 */
	public load() {
		const item = localStorage.getItem('storage');
		if (item) {
			this.storage = JSON.parse(item);
		} else {
			this.storage = this.getDefault();
			this.write();
		}
	}

	/** 默认配置 */
	public getDefault() {
		return {
			codeTips: true // 代码区双击提示
		};
	}
}