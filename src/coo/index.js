/**
 * 一些对象的基础操作
 * Created by 王佳欣 on 2018/11/11.
 */
(function() {
    let root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this || {};

    let _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    _.VERSION = '0.1';

    let class2type = {};

    'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map((item) => {
        class2type["[object " + item + "]"] = item.toLowerCase();
    });

    /**
     * 精确类型
     * @param obj
     * @returns {*}
     */
    _.type = function (obj) {
        return typeof obj === 'object' || typeof obj === 'function' ?
            class2type[Object.prototype.toString.call(obj)] || 'object' :
            typeof obj;
    };

    /**
     *  深度拷贝
     * @param obj
     * @returns {*}
     */
    _.deepClone = function (obj) {
        if (typeof obj !== 'object') {
            return obj;
        }

        let newObj = obj instanceof Array ? [] : {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = _.type(obj[key]) === 'object' ? _.deepClone(obj[key]) : obj['key'];
            }
        }

        return newObj;
    };

    /**
     * 判断对象相等
     * @param objA
     * @param objB
     * @returns {boolean}
     */
    _.equal = function (objA, objB) {
        if (objA === objB) {
            return true;
        }

        if (objA === null || objB === null) {
            return false;
        }

        // NaN
        if (objA !== objA) {
            return objB !== objB;
        }

        let type = typeof objA;

        if (type !== 'function' && type !== 'object') {
            return false;
        }

        let className = _.type(objA);

        if (className === 'number' || className === 'date' || className === 'boolean') {
            return +objA === +objB
        } else if (className === 'regexp' || className === 'string') {
            return `${objA}` === `${objB}`;
        }

        if (className === 'array') {
            let length = objA.length;
            if (length !== objB.length) return false;

            while (length--) {
                if (!_.equal(objA[length], objB[length])) {
                    return false
                }
            }
        } else {
            let keys = Object.keys(objA),
                key;
            let length = keys.length;

            if (Object.keys(objB).length !== length) {
                return false;
            }

            while (length--) {
                key = keys[length];
                if (!(objB.hasOwnProperty(key) && _.equal(objA[key], objB[key]))) {
                    return false
                }
            }
        }

        return true;
    };

    if (typeof exports !== 'undefined' && !exports.nodeType) {
        if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
})();
