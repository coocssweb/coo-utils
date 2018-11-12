/**
 * for: 节流
 ==================================
 $(window).on('scroll', throttler(this.scroll));
 ==================================
 * Created by 王佳欣 on 2018/7/9.
 */

// 节流
export const throttle = function(fn, options = {}) {
    let context;
    let args;
    let result;
    let timeout = null;

    // immediate 首次是否马上执行
    // interval 定时建个
    let {immediate = true, interval = 300} = options;

    let later = () => {
        clearTimeout(timeout);
        timeout = null;
        result = fn.apply(context, args);
    };

    let throttler =  function () {
        args = arguments;
        context = this;

        if (immediate) {
            result = fn.apply(context, args);
            immediate = false;
        } else if (!timeout) {
            timeout = setTimeout(later, interval);
        }

        return result;
    };

    throttler.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return throttler;
};

// 防抖
export const debounce = function (fn,  options = {}) {
    let context;
    let args;
    let result;
    let timeout = null;

    // immediate 首次是否马上执行
    // interval 定时建个
    let {immediate = true, interval = 300} = options;

    let later = () => {
        clearTimeout(timeout);
        timeout = null;
        result = fn.apply(context, args);
    };

    let debouncer = function () {
        args = arguments;
        context = this;
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        if (immediate) {
            setTimeout(later, interval);
            immediate = false;
        } else {
            timeout = setTimeout(later, interval);
        }

        return result;
    };

    debouncer.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debouncer;
};
