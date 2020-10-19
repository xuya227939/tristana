/* eslint-disable no-undef */
import { message } from 'antd';

// 删除cookie
export function deleteCookie() {
    document.cookie = 'token=';
}

// 日志记录
export function logger(level, msg) {
    switch(level) {
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

// 格式化秒，转换成00:00:00
export function formatSeconds(value) {
    // 秒
    let theTime = '00';
    // 分
    let theTime1 = '00';
    // 小时 
    let theTime2 = '00';
    if(value > 60) {
        theTime1 = parseInt(value / 60); 
        theTime = parseInt(value % 60); 
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60); 
            theTime1 = parseInt(theTime1 % 60); 
            if(theTime2 > 24) {
                theTime2 = parseInt(theTime2 % 24);
            }
        }
    } else {
        theTime = value;
    }
    let result = '';
    result = '' + (parseInt(theTime) >= 10 ? parseInt(theTime) : '0' + parseInt(theTime));
    result = '' + (parseInt(theTime1) >= 10 ? parseInt(theTime1) : '0' + parseInt(theTime1)) + ':' + result; 
    result = '' + (parseInt(theTime2) > 10 ? parseInt(theTime2) : '0' + parseInt(theTime2)) + ':' + result; 
    return result;
}

// 读取cookie
export function getCookie() {
    const cookies = document.cookie.split(';');
    let cookie;
    cookies.forEach(item => {
        if(item.split('=')[0].trim() == 'token') {
            cookie = item.split('=')[1];
        }
    });
    return cookie;
}

// 校验当前用户是否开启权限
export function getUserMedia() {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                resolve(stream);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// 移出流轨道
export function removeTracks(stream) {
    stream.getTracks().forEach((track) => {
        track.stop && track.stop();
    });
}

// 检查 value 是不是函数
export function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
}

// 把对象转换成url参数
export function setUrlParams(params) {
    if(Object.prototype.toString.call(params) === '[object Object]') {
        let str = '';
        Object.keys(params).forEach((item, index) => {
            if(index == 0) {
                str += `?${item}=${params[item]}`;
            } else {
                str += `&${item}=${params[item]}`;
            }
        });
        return str;
    }

}

// 获取数据类型，返回结果为 Number、String、Object、Array等
export function getRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

// 检查 value 是否为有效的类数组长度
export function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
}

// 检查 value 是否是类数组
export function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}

// 检测数据是不是除了symbol外的原始数据
export function isStatic(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    );
}

// 判断数据是不是Object类型的数据
export function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// 检查 value 是否为空
export function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (isArrayLike(value)) {
        return !value.length;
    } else if (isPlainObject(value)) {
        for (let key in value) {
            if (hasOwnProperty.call(value, key)) {
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
export function isResultError (params, hasMessage = true, isAll = false) {
    if (!isEmpty(params) && params.errCode == 0) {
        if(isAll) return params;
        return params.result;
    }
    
    if (!isEmpty(params) && params.errCode != 0) {
        if(hasMessage) message.error(params.errInfo);
        if(isAll) return params;
        return '';
    }
}

// 数组去重，返回一个新数组
export function unique(arr) {
    if (!isArrayLike(arr)) { //不是类数组对象
        return arr;
    }
    let result = [];
    let objarr = [];
    let obj = Object.create(null);

    arr.forEach(item => {
        if (isStatic(item)) {//是除了symbol外的原始数据
            let key = item + '_' + getRawType(item);
            if (!obj[key]) {
                obj[key] = true;
                result.push(item);
            }
        } else {//引用类型及symbol
            if (!objarr.includes(item)) {
                objarr.push(item);
                result.push(item);
            }
        }
    });
    return result;
}

// 获取Url参数，返回一个对象
export function getUrlParam() {
    let url = document.location.toString();
    let arrObj = url.split('?');
    let params = Object.create(null);
    if (arrObj.length > 1) {
        arrObj = arrObj[1].split('&');
        arrObj.forEach(item => {
            item = item.split('=');
            params[item[0]] = item[1];
        });
    }
    return params;
}

// 获取图片base64
export function getUrlBase64(url) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            resolve(canvas.toDataURL());
        };
        img.src = url + '?time=' + new Date().valueOf();
    });
}

// 获取pdf base64
export function getPdfBase64(url) {
    return new Promise((resolve, reject) => {
        const showPdf = document.getElementById('show-pdf'); 
        const childs = showPdf.childNodes; 
        for(let i = 0; i < childs.length; i++) {
            showPdf.removeChild(childs[i]); 
        }
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((pdf) => {
            const pages = pdf.numPages;
            // 添加canvas, 根据pdf的页数添加
            for (let i = 1; i <= pages; i++) {
                const canvas = document.createElement('canvas');
                const showPdf = document.getElementById('show-pdf');
                canvas.setAttribute('id', 'canvas' + i.toString());
                showPdf.appendChild(canvas);
            }
            let count = 0;
            for (let i = 1; i <= pages; i++) {
                pdf.getPage(i).then((page) => {
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.getElementById(('canvas' + i).toString());
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        count++;
                        // 已全部完成绘制
                        if(count == pages) {
                            resolve();
                        }
                    });
                });
            }
        });
    });
}

// 下载视频地址
export function downloadVideoUrl(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
            if (e.currentTarget.status == 200) {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([xhr.response]));
                link.download = '视频.mp4';
                link.click();
                link.remove();
                resolve();
            }

            if(e.currentTarget.status != 200) reject();
        };
        xhr.send();
    });
}
