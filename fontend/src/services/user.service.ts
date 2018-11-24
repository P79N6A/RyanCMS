import { User } from '../interface/user.interface';
import { API } from './API';

export class UserService {
	static register(nickname: string, phone: string, password: string): Promise<User> {
		return API.post('/user/register', { nickname, phone, password });
	}

	static login(phone: string, password: string): Promise<User> {
		return API.post('/user/login', {
			phone,
			password
		});
	}

	static getInfo() {
		return API.get('/user/info');
	}
}
