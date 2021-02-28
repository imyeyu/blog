/**
 * 生成随机数
 * 
 * @param min 最小值
 * @param max 最大值
 */
export default function random(min: number, max: number): number {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}
