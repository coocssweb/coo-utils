/**
 * 柯里化函数
 */
function curry(fn, ...args) {
    if (fn.length <= args.length) {
        return fn(...args);
    } else {
        return curry.bind(null, fn, ...args);
    }
}
