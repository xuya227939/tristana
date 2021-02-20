/* eslint-disable no-undef */
import { message } from 'antd';

// 删除cookie
export function deleteCookie() {
    document.cookie = 'token=';
}

// 日志记录
export function logger(level: string, msg: any) {
    switch (level) {
        case 'error':
            console.error(new Date(), JSON.stringify(msg));
            break;
        case 'warn':
            console.warn(new Date(), JSON.stringify(msg));
            break;
        case 'log':
            console.log(new Date(), JSON.stringify(msg));
            break;
    }
}

// 读取cookie
export function getCookie() {
    const cookies = document.cookie.split(';');
    let cookie: any;
    cookies.forEach(item => {
        if (item.split('=')[0].trim() == 'token') {
            cookie = item.split('=')[1];
        }
    });
    return cookie;
}

// 校验当前用户是否开启权限
export function getUserMedia() {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then(stream => {
                resolve(stream);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 移出流轨道
export function removeTracks(stream) {
    stream.getTracks().forEach(track => {
        track.stop && track.stop();
    });
}

// 检查 value 是不是函数
export function isFunction(value: any) {
    return Object.prototype.toString.call(value) === '[object Function]';
}

// 把对象转换成url参数
export function setUrlParams(params: any) {
    if (Object.prototype.toString.call(params) === '[object Object]') {
        let str = '';
        Object.keys(params).forEach((item, index) => {
            if (index == 0) {
                str += `?${item}=${params[item]}`;
            } else {
                str += `&${item}=${params[item]}`;
            }
        });
        return str;
    }
}

// 获取数据类型，返回结果为 Number、String、Object、Array等
export function getRawType(value: any) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

// 检查 value 是否为有效的类数组长度
export function isLength(value: any) {
    return (
        typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER
    );
}

// 检查 value 是否是类数组
export function isArrayLike(value: any) {
    return value != null && isLength(value.length) && !isFunction(value);
}

// 检测数据是不是除了symbol外的原始数据
export function isStatic(value: any) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    );
}

// 格式化秒，转换成00:00:00
export function formatSeconds(value: number) {
    // 秒
    let theTime: any = '00';
    // 分
    let theTime1: any = '00';
    // 小时
    let theTime2: any = '00';
    if (value > 60) {
        theTime1 = parseInt((value / 60).toString());
        theTime = parseInt((value % 60).toString());
        if (theTime1 > 60) {
            theTime2 = parseInt((theTime1 / 60).toString());
            theTime1 = parseInt((theTime1 % 60).toString());
            if (theTime2 > 24) {
                theTime2 = parseInt((theTime2 % 24).toString());
            }
        }
    } else {
        theTime = value;
    }
    let result = '';
    result = '' + (parseInt(theTime) >= 10 ? parseInt(theTime) : '0' + parseInt(theTime));
    result =
        '' +
        (parseInt(theTime1) >= 10 ? parseInt(theTime1) : '0' + parseInt(theTime1)) +
        ':' +
        result;
    result =
        '' +
        (parseInt(theTime2) > 10 ? parseInt(theTime2) : '0' + parseInt(theTime2)) +
        ':' +
        result;
    return result;
}

// 判断数据是不是Object类型的数据
export function isPlainObject(obj: object) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// 检查 value 是否为空
export function isEmpty(value: any) {
    if (value == null) {
        return true;
    }
    if (isArrayLike(value)) {
        return !value.length;
    } else if (isPlainObject(value)) {
        for (let key in value) {
            if (window.hasOwnProperty.call(value, key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * 判断返回值是否错误
 * hasMessage 默认值为true，显示消息
 * isAll 默认值为false，是否需要返回所有信息
 * @param {*} params
 * @param {*} hasMessage
 * @param {*} isAll
 */
export function isResultError(params: any, hasMessage: boolean = true, isAll: boolean = false) {
    if (!isEmpty(params) && params.errCode == 0) {
        if (isAll) return params;
        return params.result;
    }

    if (!isEmpty(params) && params.errCode != 0) {
        if (hasMessage) message.error(params.errInfo);
        if (isAll) return params;
        return '';
    }
}
