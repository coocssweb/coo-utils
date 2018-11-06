/**
 * 数据代理，实现双向绑定
 * Created by 王佳欣 on 2018/11/4.
 */
export default (obj, key, callback) => {
    // 临时值
    let val = obj[key];
    Object.defineProperty(obj, key, {
        get () {
            return val;
        },
        set (newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            // 设置新值后，执行回调函数
            callback && callback(val);
        }
    });
};
