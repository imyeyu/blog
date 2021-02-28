import { Model } from './Model';

export type User = {
	email?: string;
	userName?: string;
	password?: string;
} & Model