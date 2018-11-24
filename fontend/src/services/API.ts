import { UserService } from './user.service';
import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { TOKEN } from '../config/constant';

Axios.defaults.headers.authorization = localStorage.getItem(TOKEN);
Axios.defaults.baseURL = `/api`;
export const API = {
	post: async (url: string, data?: any, config?: AxiosRequestConfig) => {
		try {
			const result = await Axios.post(url, data, config);
			return result.data;
		} catch (error) {
			throw new Error((error as any).response.data.message);
		}
	},
	get: async (url: string, config?: AxiosRequestConfig) => {
		try {
			const result = await Axios.get(url, config);
			return result.data;
		} catch (error) {
			const resError = new Error((error as any).message) || new Error((error as any).response.data.message);
			throw resError;
		}
	},
	user: UserService
};
