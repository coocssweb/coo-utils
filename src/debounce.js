/**
 * 防抖
 * window.addEventListener('scroll', debounce(obj.showName.bind(obj, 20, 'fujian')));
 */
export const debounce = (callback, option = {time: 500, immediately: false}) => {
    let timeout = null;
    let context = null;
    let result = null;
    let args = null;
    let {time, immediately} = option;

    let later = function () {
        clearTimeout(timeout);
        timeout = null;
        immediately = false;
        result = callback.call(context, args);
        return result;
    };

    let func = function (...params) {
        context = this;
        args = params;

        if (immediately) {
            later();
        }

        if (!timeout) {
            timeout = setTimeout(() => {
                later();
            }, time);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                later();
            }, time);
        }
    };

    func.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return func;
};
