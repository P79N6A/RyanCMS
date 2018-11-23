import Axios from 'axios';
import { User } from '../interface/user.interface';

export class UserService {
	static register(nickname: string, phone: string, password: string): User {
		return Axios.post('/register', { nickname, phone, password });
	}

	static login(password: string, nickname?: string, phone?: string) {
		return Axios.post('/login', {
			nickname,
			phone,
			password
		});
	}
}
