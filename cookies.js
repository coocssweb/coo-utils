/**
 * for：cookies
 * Created by 王佳欣 on 2018/11/4.
 */
class Cookies {
    constructor () {
        this.domain = '';
    }
    // 设置cookie项
    setItem (name, value, expireMinute, callback) {
        // 过期时间，默认24小时
        expireMinute = expireMinute || 1440;
        let millisecond = new Date().getTime();
        let expiresTime = new Date(millisecond + 60 * 1000 * expireMinute);
        let expires = expireMinute === null ? '' : `;expires=${expiresTime.toGMTString()}`;
        document.cookie = `${name}=${escape(value)};domain=${this.domain};path=/${expires}`;
        callback && callback({name, value});
    }

    // 获取cookie项
    getItem (name) {
        if (document.cookie.length > 0) {
            let charStart = document.cookie.indexOf(`${name}=`);
            if (charStart !== -1) {
                charStart = charStart + name.length + 1;
                let charEnd = document.cookie.indexOf(';', charStart);
                if (charEnd === -1) {
                    charEnd = document.cookie.length;
                }
                return unescape(document.cookie.substring(charStart, charEnd));
            }
        }
        return '';
    }

    // 移除cookie项
    removeItem (name, callback) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        callback && callback(name);
    }
}

export default Cookies;
