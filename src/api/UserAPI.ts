import axios from 'axios';
import { User, UserSignIn, UserVO } from '@/type/User';

async function signIn(userSignIn: UserSignIn): Promise<UserVO> {
	return axios.post('/user/sign-in', userSignIn);
}

async function isSignedIn(id: number, token: string): Promise<Boolean> {
	console.log(token);
	
	return axios.post('/user/sign-in/status', { uid: id, token });
}

async function register(user: User, captcha: string): Promise<User> {
	return axios.post('/user/register', { data: user, captcha });
}

export default {
	signIn,
	isSignedIn,
	register
}