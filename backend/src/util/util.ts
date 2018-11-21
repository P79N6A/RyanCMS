export function randomRange(min: number, max: number) {
    return Math.floor(min + (max - min) * Math.random());
}

/**
 * 递归键，对键执行操作
 * @param {Object, Array} obj 对象或数组
 * @param {Function} func
 */
export function loopKey(obj, func) {
    let tempObj = obj; // 基本数据类型
    if (Array.isArray(obj)) { // 数组
        tempObj = obj.map(item => loopKey(item, func));
    }
    else if (typeof obj === 'object' && obj !== null) { // 对象
        tempObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                tempObj[func(key)] = loopKey(obj[key], func);
            }
        }
    }
    return tempObj;
}

/**
 * 递归键，对值执行操作
 * @param {Object, Array} obj 对象或数组
 * @param {Function} func
 */
export function loopKeyForValue(obj, func, key = '') {
    let tempObj; // 基本数据类型
    if (Array.isArray(obj)) { // 数组
        tempObj = obj.map(item => loopKeyForValue(item, func));
    }
    else if (typeof obj === 'object' && obj !== null) { // 对象
        tempObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                tempObj[key] = loopKeyForValue(obj[key], func, key);
            }
        }
    }
    else {
        tempObj = func(key, obj);
    }
    return tempObj;
}
