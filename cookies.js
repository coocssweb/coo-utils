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
        return `${this.preId}_${key}`;
    }

    // 设置cookie项，默认过期时间24小时
    setItem (key, value, expireMinute = 1440, callback) {
        key = this.getKey(key);
        expireMinute = 60 * 1000 * expireMinute;
        let timestamp = new Date().getTime();
        let expiresTime = new Date(timestamp + expireMinute);
        document.cookie = `${key}=${escape(value)};domain=${this.domain};path=/;expires=${expiresTime.toGMTString()}`;
        callback && callback({key, value});
    }

    // 获取cookie项
    getItem (key) {
        key = this.getKey(key);
        if (document.cookie.length > 0) {
            let charStartIndex = document.cookie.indexOf(`${key}=`);
            if (charStartIndex !== -1) {
                charStartIndex = charStartIndex + key.length + 1;
                let charEndIndex = document.cookie.indexOf(';', charStartIndex);
                if (charEndIndex === -1) {
                    charEndIndex = document.cookie.length;
                }
                return unescape(document.cookie.substring(charStartIndex, charEndIndex));
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
