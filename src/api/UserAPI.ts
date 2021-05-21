import axios from 'axios';
import { User, UserSignin } from '@/type/User';

async function signin(userSignin: UserSignin): Promise<Boolean> {
	return axios.post('/user/signin', userSignin);
}

async function register(user: User): Promise<User> {
	return axios.post('/user/register', user);
}

export default {
	signin,
	register
}