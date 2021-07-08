import { paddingZero } from '@/helpers/Toolkit';

function f(v : number) : number {
	return Math.floor(v);
}

/**
 * 计算时间差
 *
 * @param begin 开始时间
 * @param end   结束时间（如果没有就是当前时间）
 * @returns \{
 *     l:  时间戳
 *     y:  年
 *     d:  日
 *     h:  时
 *     m:  分
 *     s:  秒
 *     ms: 毫秒
 * \}
 */
export function calcDifference(begin: Date, end?: Date) : any {
	if (!end) {
		end = new Date();
	}

	const cs = 1000, cm = 6E4, ch = 36E5, cd = 864E5, cy = 31536E6;
	const l  = end.getTime() - begin.getTime();
	const y  = f(l / cy),
		  d  = f((l / cd) - y * 365),
		  h  = f((l - (y * 365 + d) * cd) / ch),
		  m  = f((l - (y * 365 + d) * cd - h * ch) / cm),
		  s  = f((l - (y * 365 + d) * cd - h * ch - m * cm) / cs),
		  ms = f(((l - (y * 365 + d) * cd - h * ch - m * cm) / cs - s) * cs);

	return { l, y, d, h, m, s, ms };
}

/**
 * Unix 时间戳转日期
 *
 * @param unix 时间戳
 */
export function toDate(unix?: number) : string {
	if (!unix) return '';
	const d = new Date(unix);
	return `${d.getFullYear()}-${paddingZero(d.getMonth() + 1)}-${paddingZero(d.getDate())}`;
}

/**
 * Unix 时间戳转日常时间
 *
 * @param unix 时间戳
 */
export function toTime(unix?: number) : string {
	if (!unix) return '';
	const d = new Date(unix);
	return `${paddingZero(d.getHours())}:${paddingZero(d.getMinutes())}:${paddingZero(d.getSeconds())}`;
}

/**
 * Unix 时间戳转日期和时间
 *
 * @param unix 时间戳
 */
export function toDateTime(unix?: number) : string {
	if (!unix) return '';
	return `${toDate(unix)} ${toTime(unix)}`;
}