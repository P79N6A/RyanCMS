import { User } from '../interface/user.interface';
import { API } from './API';

export class UserService {
	static register(nickname: string, phone: string, password: string): Promise<User> {
		return API.post('/user/register', { nickname, phone, password });
	}

	static login(password: string, nickname?: string, phone?: string): Promise<User> {
		return API.post('/user/login', {
			nickname,
			phone,
			password
		});
	}
}
