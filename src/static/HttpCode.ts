export default function httpCodeMsg(code: number): string {
	const t = codes.find(c => c.code === code);
	if (t) {
		return t.text;
	} else {
		return '未知错误';
	}
}

const codes = [
	{
		code: 400,
		text: '请求参数错误'
	},
	{
		code: 401,
		text: '无权限访问'
	},
	{
		code: 403,
		text: '禁止访问'
	},
	{
		code: 404,
		text: '请求接口不存在'
	},
	{
		code: 500,
		text: '服务端异常'
	},
	{
		code: 501,
		text: '无效的请求'
	},
	{
		code: 502,
		text: '服务器无响应'
	},
	{
		code: 503,
		text: '服务器繁忙'
	}
]