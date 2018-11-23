import Axios from 'axios';

export class UserService {
	static register(password: string, nickname: string, phone: string) {
		return Axios.post('/register', {
			nickname,
			phone,
			password
		});
	}

	static login(password: string, nickname?: string, phone?: string) {
		return Axios.post('/login', {
			nickname,
			phone,
			password
		});
	}
}
