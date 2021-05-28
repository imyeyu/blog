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

// 已登录用户令牌对象（存于 Storage）
export type UserToken = {
	id?: number;
	name?: string;
	token?: string; // 通信令牌
}