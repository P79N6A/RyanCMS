// 下划线转驼峰
export function toCamelCase(key: string) {
  return key.replace(/_+[a-zA-Z]/g, (str, index) => index ? str.substr(-1).toUpperCase() : str);
}

// 驼峰转下划线 
export function toPascalCase(key: string) {
  return key.replace(/[A-Z]/g, (str, index) => index ? '_' + str.substr(-1).toLowerCase() : str);
}

// 对象下划线转驼峰
export function toCamelCaseObj(obj: Object) {
  let camelObj = obj; // 基本数据类型
  if (Array.isArray(obj)) { // 数组
    camelObj = obj.map(item => toCamelCaseObj(item));
  }
  else if (typeof obj === 'object' && obj !== null) { // 对象
    camelObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        camelObj[toCamelCase(key)] = toCamelCaseObj(obj[key]);
      }
    }
  }
  return camelObj;
}

// 对象驼峰转下划线
export function toPascalCaseObj(obj: Object) {
  let pascalObj = obj; // 基本数据类型
  if (Array.isArray(obj)) { // 数组
    pascalObj = obj.map(item => toPascalCaseObj(item));
  }
  else if (typeof obj === 'object' && obj !== null) { // 对象
    pascalObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        pascalObj[toPascalCase(key)] = toPascalCaseObj(obj[key]);
      }
    }
  }
  return pascalObj;
}
