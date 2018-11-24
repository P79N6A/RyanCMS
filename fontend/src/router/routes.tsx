import { Home } from '../page/Home/Home';
import { Register } from '../page/Register/Register';
import { Forbidden } from '../page/Forbidden/Forbidden';
import { Login } from '../page/Login/Login';
import { NotFound } from '../page/NotFound/NotFound';
export const routes = [
	{
		path: '/',
		component: Home,
		exact: true,
		isAuth: true
	},
	{
		path: '/login',
		component: Login,
		exact: true
	},
	{
		path: '/register',
		component: Register,
		exact: true
	},
	{
		path: '/404',
		component: NotFound,
		exact: true
	},
	{
		path: '/forbidden',
		component: Forbidden,
		exact: true
	}
];
