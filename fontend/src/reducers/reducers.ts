import { combineReducers } from 'redux';

import { user } from '../model/User';
import { User } from '../interface/user.interface';

export interface Reducers {
	user: User;
}

export const reducers = combineReducers({
	user
});
