import { UserService } from './user.service';
import Axios, { AxiosRequestConfig, AxiosError } from 'axios';

const token = localStorage.getItem('token');

Axios.defaults.headers.authorization = `token`;
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
			throw new Error((error as any).response.data.message);
		}
	},
	user: UserService
};
