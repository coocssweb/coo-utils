/**
 * for：cookies
 * demo ==================
 * let cookies = new Cookies('default');
 * cookies.setItem('uid', 980088);
 * =======================
 * Created by 王佳欣 on 2018/11/4.
 */
class Cookies {
    constructor (preId) {
        this.domain = domain || '';
        this.preId = preId || 'default';
    }

    getKey (key) {
        return `${this.preId}_${key}`
    }

    // 设置cookie项
    setItem (key, value, expireMinute, callback) {
        key = this.getKey(key);
        // 过期时间，默认24小时
        expireMinute = expireMinute || 1440;
        let millisecond = new Date().getTime();
        let expiresTime = new Date(millisecond + 60 * 1000 * expireMinute);
        let expires = expireMinute === null ? '' : `;expires=${expiresTime.toGMTString()}`;
        document.cookie = `${key}=${escape(value)};domain=${this.domain};path=/${expires}`;
        callback && callback({key, value});
    }

    // 获取cookie项
    getItem (key) {
        key = this.getKey(key);
        if (document.cookie.length > 0) {
            let charStart = document.cookie.indexOf(`${key}=`);
            if (charStart !== -1) {
                charStart = charStart + key.length + 1;
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
    removeItem (key, callback) {
        key = this.getKey(key);
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        callback && callback(key);
    }
}

export default Cookies;
