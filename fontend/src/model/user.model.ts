import { AnyAction } from 'redux';
import { User } from '../interface/user.interface';
import Axios from 'axios';

const LOGIN: string = 'LOGIN';
const UPDATE: string = 'UPDATE';

interface UserAction extends AnyAction {
	data: User;
}

export function userLogin(data: User) {
	return { type: LOGIN, data };
}

export function userUpdate(data: User) {
	return { type: UPDATE, data };
}

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
