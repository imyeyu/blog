/**
 * 补零
 * 
 * @param v 数值
 * @param l 最终长度（默认 2）
 */
function paddingZero(v: number, l: number = 2) : string {
	return (Array(l).join("0") + v).slice(-l);
}

/**
 * Unix 时间戳转日期
 * 
 * @param unix 时间戳
 */
function toDate(unix: number) : string {
	const d = new Date(unix);
	return `${d.getFullYear()}-${paddingZero(d.getMonth() + 1)}-${paddingZero(d.getDate())}`;
}

/**
 * Unix 时间戳转日常时间
 * 
 * @param unix 时间戳
 */
function toTime(unix: number) : string {
	const d = new Date(unix);
	return `${paddingZero(d.getHours())}:${paddingZero(d.getMinutes())}:${paddingZero(d.getSeconds())}`;
}

/**
 * Unix 时间戳转日期和时间
 * 
 * @param unix 时间戳
 */
function toDateTime(unix: number) : string {
	return `${toDate(unix)} ${toTime(unix)}`;
}

export default {
	paddingZero,
	toDate,
	toTime,
	toDateTime
}