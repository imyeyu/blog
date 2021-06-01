import Events from '@/helpers/Events';
import { sleep } from '@/helpers/Toolkit';
import { Dialog } from '@/type/Dialog';

/**
 * 会话系统
 * 示例：
 * await this.$store.state.dialogBus.display({
 *     title: '标题',
 *     content: '内容'
 * });
 * await this.$store.state.dialogBus.info('默认会话内容');
 * await this.$store.state.dialogBus.confirm('询问会话内容');
 */
export default class DialogBus {

	public isShow = false;    // 显示根容器
	public isClose = true;    // 关闭窗体，存在过渡动画
	public isLoading = false; // 为 true 时显示加载中

	public option: Dialog;

	constructor() {
		this.option = this.resetOption();
	}

	/**
	 * 默认会话
	 * 
	 * @param content 内容
	 */
	public async info(content: string) {
		return this.display({ content });
	}

	/**
	 * 成功会话
	 * 
	 * @param content 内容
	 * @param title   标题
	 * @returns 
	 */
	public async success(content: string, title = '成功') {
		return this.display({
			icon: 'SUCCESS',
			title,
			content
		});
	}

	/**
	 * 警告会话
	 * 
	 * @param content 内容
	 * @param title   标题
	 * @returns 
	 */
	public async warning(content: string, title = '警告') {
		return this.display({
			icon: 'WARNING',
			title,
			content
		});
	}

	/**
	 * 错误会话
	 * 
	 * @param content 内容
	 * @param title   标题
	 * @returns 
	 */
	public async error(content: string, title = '错误') {
		return this.display({
			icon: 'ERROR',
			title,
			content
		});
	}

	/**
	 * 询问会话
	 * 
	 * @param content 内容
	 * @param title   标题
	 * @returns 
	 */
	public async confirm(content: string, title: string): Promise<boolean> {
		return this.display({ title, content});
	}

	/**
	 * 显示会话
	 * 
	 * @param option 配置
	 */
	public async display(option: Dialog): Promise<boolean> {
		Object.assign(this.option, option);

		this.isLoading = option.isLoading as boolean;
		this.isShow = true;
		this.isClose = false;

		const confirm = await new Promise<boolean>((resolve) => {
			Events.reset('dialog-event', (result: any) => {
				resolve(result);
			});
		});
		
		this.isClose = true;
		await sleep(320); // 动画延时
		this.isShow = false;

		this.resetOption();

		return confirm;
	}

	/** 还原配置 */
	private resetOption() {
		const option = {
			icon: 'INFO',
			title: '提示',
			titleSub: '',
			content: '',
		
			textOK: '好',
			textNO: '否',
			textCancel: '取消',
		
			useNo: false,
			useCancel: false,

			isLoading: false
		};
		this.option = option;
		return option;
	}
}