import { AnyAction } from 'redux';
import { User } from '../interface/user.interface';
import { TOKEN } from '../config/constant';

const LOGIN: string = 'LOGIN';
const UPDATE: string = 'UPDATE';
const LOGOUT: string = 'LOGOUT';

interface UserAction extends AnyAction {
	data: User;
}

export interface UserLogin {
	(data: User): void;
}

export interface UserUpdate {
	(data: User): void;
}

export interface Logout {
	(): void;
}
export const userLogin: UserLogin = function(data: User) {
	return { type: LOGIN, data };
};

export const userUpdate: UserUpdate = function(data) {
	return { type: UPDATE, data };
};

export const logout: Logout = function() {
	return { type: LOGOUT };
};

export function user(state: User | null = null, action: UserAction) {
	switch (action.type) {
		case UPDATE:
			if (!state) break;
			for (let key in action.data) {
				if (state.hasOwnProperty(key)) {
					state[key] = action.data[key];
				}
			}
			break;
		case LOGIN:
			localStorage.setItem(TOKEN, action.data.token);
			state = action.data;
			break;
		case LOGOUT:
			localStorage.setItem(TOKEN, '');
			state = null;
		default:
	}
	return state;
}
