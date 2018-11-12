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

    // 类型返回
    _.type = function (obj) {
        return typeof obj === 'object' || typeof obj === 'function' ?
            class2type[Object.prototype.toString.call(obj)] || 'object' :
            typeof obj;
    };

    // 深度拷贝
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

    // 判断相等
    _.equal = function (objA, objB) {

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
