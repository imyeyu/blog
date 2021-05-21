import { Model } from './Model';

// 后端对象
export type User = {
	email?: string;
	name?: string;
	password?: string;
} & Model

// 登录参数对象
export type UserSignin = {
	user: string;
	password: string;
	captcha: string;
}