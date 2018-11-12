/**
 * for：可设置命名空间，可设置失效时间（默认一个月）
 * Created by 王佳欣 on 2018/11/4.
 */

class Storage {
    /**
     * @param preId 前置符
     */
    constructor (preId) {
        this.preId = preId || '';
        // 设置拆分符号
        this.timeSign = '|*|';
        this.storage = localStorage || window.localStorage;
        this.status = {
            SUCCESS: 0,
            FAILURE: 1,
            OVERFLOW: 2,
            TIMEOUT: 3
        };
    }

    /**
     * 获取key
     * @param key
     * @returns {string}
     */
    getKey (key) {
        return `${this.preId}-${key}`;
    }

    /**
     * 设置数据
     * @param key
     * @param value
     * @param expired 失效时间戳
     * @param callback
     */
    setItem (key, value, expired, callback) {
        key = this.getKey(key);
        let status = this.status.SUCCESS;
        // 计算过期时间
        let time = new Date().getTime() + (expired || (1000 * 60 * 60 * 24 * 31));
        try {
            this.storage.setItem(key, `${time}${this.timeSign}${value}`);
        } catch (e) {
            status = this.status.OVERFLOW;
        }

        callback && callback(status, key, value);
    }

    /**
     * 获取数据
     * @param key
     * @param callback
     * @returns {*}
     */
    getItem (key, callback) {
        key = this.getKey(key);
        let status = this.status.SUCCESS;
        let value;
        let result;
        let index;
        try {
            value = this.storage.getItem(key);
        } catch (e) {
            result = {
                status: this.status.FAILURE,
                value: null
            };
            callback && callback(result.status, result.value);
            return result;
        }

        if (value) {
            // 获取时间戳
            index = value.indexOf(this.timeSign);
            let time = +value.slice(0, index);

            if (new Date(time).getTime() > new Date().getTime() || time === 0) {
                value = value.slice(index + this.timeSign.length);
            } else {
                value = null;
                status = this.status.TIMEOUT;
                this.removeItem(key);
            }
        } else {
            status = this.status.FAILURE;
        }

        result = {status, value};
        callback && callback(result.status, result.value);
        return result;
    }

    /**
     * 删除数据
     * @param key
     * @param callback
     */
    removeItem (key, callback) {
        key = this.getKey(key);
        let status = this.status.FAILURE;
        let value = this.storage.getItem(key);
        if (value) {
            try {
                this.storage.removeItem(key);
                status = this.status.SUCCESS;
            } catch (e) {}
        }
        callback && callback(status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length));
    }
}

export default Storage;
