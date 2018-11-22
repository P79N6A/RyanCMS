import { message } from 'antd';
import 'reflect-metadata';
export function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	const fun = descriptor.value;
	descriptor.value = function() {
		try {
			Validator(propertyKey, target, arguments);
			fun.apply(this, arguments);
		} catch (error) {
			message.warn(error.message);
		}
	};
}

export function name(target: any, propertyKey: string, index: number) {
	Reflect.defineMetadata(propertyKey, index, target, 'name');
}

export function email(target: any, propertyKey: string, index: number) {
	Reflect.defineMetadata(propertyKey, index, target, 'email');
}

export function phone(target: any, propertyKey: string, index: number) {
	Reflect.defineMetadata(propertyKey, index, target, 'phone');
}

export function password(target: any, propertyKey: string, index: number) {
	Reflect.defineMetadata(propertyKey, index, target, 'password');
}

export function comfirmPassword(target: any, propertyKey: string, index: number) {
	Reflect.defineMetadata(propertyKey, index, target, 'comfirmPassword');
}

export const checkName = (val: string) => !!(val && (val.length > 2 && val.length < 8));
export const checkEmail = (val: string) => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
export const checkPhone = (val: string) => /^\d{11}$/.test(val);
export const checkPassword = (val: string) => /^\w{6,36}$/.test(val);
export const checkComfirmPassword = (val: string[]) => Array.isArray(val) && val[0] === val[1];

function Validator(propertyKey: string, target: any, data: object) {
	let rules = [
		{
			type: 'name',
			checkValue: checkName,
			message: '用户名必须在2-8位'
		},
		{
			type: 'email',
			checkValue: checkEmail,
			message: '邮箱的格式不对'
		},
		{
			type: 'phone',
			checkValue: checkPhone,
			message: '手机号码的格式不对'
		},
		{
			type: 'password',
			checkValue: checkPassword,
			message: '密码的格式不对'
		},
		{
			type: 'comfirmPassword',
			checkValue: checkComfirmPassword,
			message: '两次输入的密码不一样'
		}
	];

	for (let item of rules) {
		let key: string = Reflect.getMetadata(propertyKey, target, item.type);
		if (data.hasOwnProperty(key)) {
			const value = data[key];
			if ((item.checkValue as any)(value)) {
				throw new Error(item.message);
			}
		}
	}
}
