import { Model } from './Model';

// 后端对象
export type User = {
	email?: string;
	name?: string;
	password?: string;
} & Model

// 用户资料对象
export type UserData = {
	userId?: number;
	wrapper?: string;
	avatar?: string;
	exp?: number;
	sex?: number;
	birth?: number;
	qq?: string;
	sign?: string;
	signedInIp?: string;
	signedInAt?: number;
} & Model

// 登录参数对象（发送登录请求）
export type UserSignIn = {
	user: string;
	password: string;
	captcha: string;
}

// 已登录用户对象（存于 Storage）
export type UserSignedIn = {
	id?: number;
	name?: string;
	token?: string;  // 通信令牌
	data?: UserData; // 用户资料
}