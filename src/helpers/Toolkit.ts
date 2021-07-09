/**
 * 延时执行
 *
 * @param ms 延时毫秒
 */
export async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 字符串格式化
 *
 * @param string 字符串
 * @param args   参数
 * @returns 格式后的字符串
 */
export function format(string: any, ...args: any): string {
	return string.replace(/\{(\d+)\}/g, (m: any, n: any) => {
		return args[n] !== undefined ? args[n] : m;
	});
}

/**
 * 获取节点属性
 *
 * @param el   节点
 * @param name 属性名
 * @returns 属性
 */
export function getAttribute(el: Element, name: string): string | null {
	return el.hasAttribute(name) ? el.getAttribute(name) : null;
}

/**
 * 转为数字
 *
 * @param string   字符串
 * @param fallback 如果失败，返回该值
 * @returns 转换后或转换失败数据
 */
export function toNumber(string: string, fallback: number | null) {
	if (!string) return fallback;
	const number = Number(string);
	return isFinite(number) ? number : fallback;
}

/**
 * 解析字符串为 DOM 节点。此 DOM 字符串必须有且仅有一个根节点
 *
 * @param string 字符串
 * @returns DOM 节点
 */
export function toDOM(string: string): HTMLDocument {
	return new DOMParser().parseFromString(string, 'text/xml');
}

/**
 * 异步执行
 *
 * @param event 函数
 */
export function async(event: Function) {
	setTimeout(event, 0);
}

/**
 * 前置补零
 *
 * @param v 数值
 * @param l 最终长度（默认 2）
 */
export function paddingZero(v: number, l = 2) : string {
	return (Array(l).join('0') + v).slice(-l);
}

/**
 * 生成随机数
 *
 * @param min 最小值
 * @param max 最大值
 */
export function random(max = 100, min = 0): number {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * 资源地址
 * 如果是 res@/article/2/1.png，将会补充资源站变为 https://res.imyeyu.net/article/2/1.png
 * 如果是 dl@/article/7z/123.7z，将会补充下载站变为 http://dl.imyeyu.net/7z/123.7z
 * 否则原样返回
 *
 * @param url 资源地址
 * @returns 转换结果
 */
export function resURL(url: string): string {
	const at = url.indexOf('@');
	const start = url.substring(0, at);
	const path = url.substring(at + 1);
	switch (start) {
		case 'res': return 'https://res.imyeyu.net' + path;
		case 'dl':  return 'http://dl.imyeyu.net'   + path;
	}
	return url;
}