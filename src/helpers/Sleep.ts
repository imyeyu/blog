/**
 * 延时执行
 * 
 * @param ms 延时毫秒
 */
export default async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
