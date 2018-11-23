import { AnyAction } from 'redux';
import { User } from '../interface/user.interface';
import Axios from 'axios';

const LOGIN: string = 'LOGIN';
const UPDATE: string = 'UPDATE';

interface UserAction extends AnyAction {
	data: User;
}

export interface UserLogin {
	(data: User): void;
}

export interface UserUpdate {
	(data: User): void;
}
export const userLogin: UserLogin = function(data: User) {
	return { type: LOGIN, data };
};

export const userUpdate: UserUpdate = function(data) {
	return { type: UPDATE, data };
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
			Axios.defaults = {
				headers: {
					authorization: action.data.token
				}
			};
			state = action.data;
			break;
		default:
	}
	return state;
}
