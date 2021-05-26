import { Model } from './Model';

// 后端对象
export type User = {
	email?: string;
	name?: string;
	password?: string;
} & Model

// 登录参数对象（发送登录请求）
export type UserSignIn = {
	user: string;
	password: string;
	captcha: string;
}

// 已登录用户储存对象（Storage）
export type UserVO = {
	id?: number;
	email?: string;
	name?: string;
	token?: string;     // 通信令牌
	updatedAt?: number; // 最近获取状态时间
}