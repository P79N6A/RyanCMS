
import { message } from 'antd';
import "reflect-metadata";
export function validate(target, propertyKey, descriptor) {
  const fun = descriptor.value;
  descriptor.value = function () {
    try {
      Validator(propertyKey, target, arguments);
      fun.apply(this, arguments);
    } catch (error) {
      message.warn(error.message);
    }
  };
}

export function name(target, propertyKey, index) {
  Reflect.defineMetadata(propertyKey, index, target, 'name');
}

export function email(target, propertyKey, index) {
  Reflect.defineMetadata(propertyKey, index, target, 'email');
}

export function phone(target, propertyKey, index) {
  Reflect.defineMetadata(propertyKey, index, target, 'phone');
}

export function password(target, propertyKey, index) {
  Reflect.defineMetadata(propertyKey, index, target, 'password');
}


export function comfirmPassword(target, propertyKey, index) {
  Reflect.defineMetadata(propertyKey, index, target, 'comfirmPassword');
}


export const checkName =  (val) => val && (val.length > 2 && val.length < 8);
export const checkEmail =  (val) => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
export const checkPhone =  (val) => /^\d{11}$/.test(val);
export const checkPassword =  (val) => /^\w{6,36}$/.test(val);
export const checkComfirmPassword =  (val) => Array.isArray(val) && (val[0] === val[1]);
 

function Validator(propertyKey, target, data) {
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
    let key = Reflect.getMetadata(propertyKey, target, item.type);
    if (data.hasOwnProperty(key)) {
      if (item.checkValue(data[key])) {
        throw new Error(item.message);
      }
    }
  }

}