import axios from 'axios';
import { User, UserData, UserSignIn, UserSignedIn } from '@/type/User';

async function register(user: User, captcha: string): Promise<UserSignedIn> {
	return axios.post('/user/register', { data: user, captcha });
}

async function signIn(userSignIn: UserSignIn): Promise<UserSignedIn> {
	return axios.post('/user/sign-in', userSignIn);
}

async function isSignedIn(id: number, token: string): Promise<Boolean> {
	return axios.post('/user/sign-in/status', { uid: id, token });
}

async function getData(id: number): Promise<UserData> {
	return axios.post(`/user/${id}`);
}

async function signOut(id: number, token: string): Promise<Boolean> {
	return axios.post('/user/sign-out', { uid: id, token });
}

export default {
	register,
	signIn,
	isSignedIn,
	getData,
	signOut
};