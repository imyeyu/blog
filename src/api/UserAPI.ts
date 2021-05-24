import axios from 'axios';
import { User, UserSignin } from '@/type/User';

async function signin(userSignin: UserSignin): Promise<Boolean> {
	return axios.post('/user/signin', userSignin);
}

async function register(user: User, captcha: string): Promise<User> {
	return axios.post('/user/register', { data: user, captcha });
}

export default {
	signin,
	register
}