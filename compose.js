/**
 * 实现 compose 方法
 * Created by 王佳欣 on 2018/11/6.
 */
export default (...fns) => {
    if (fns.length === 0) {
        return (...args) => {
            return args;
        };
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return fns.reduce((prev, curr) => {
        return (...args) => {
            return prev(curr(...args));
        }
    });
}