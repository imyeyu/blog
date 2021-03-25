import { paddingZero } from '@/helpers/Toolkit';

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