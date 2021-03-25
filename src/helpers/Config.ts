/**
 * 浏览器本地配置
 */
export default class Config {

	private config: any;

	constructor() {
		this.load();
	}

	/** 获取 */
	public get(key: string) {
		return this.config[key];
	}

	/** 设置 */
	public set(key: string, value: any) {
		this.config[key] = value;
		this.write();
	}

	/** 写入所有配置 */
	public write() {
		localStorage.setItem('config', JSON.stringify(this.config));
	}

	/** 读取所有配置 */
	public load() {
		const item = localStorage.getItem('config');
		if (item) {
			this.config = JSON.parse(item);
		} else {
			this.config = this.getDefault();
			this.write();
		}
	}

	/** 默认配置 */
	public getDefault() {
		return {
			codeTips: true, // 代码区双击提示
		}
	}
}