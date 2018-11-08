/**
 * for: 数据代理，实现双向绑定
 * demo ========================
 * let personal = {
 *      age: 10,
 *      name: 'kobe'
 * };
 *
 * Proxy({
 *      obj: personal,
 *      key: 'name',
 *      callback: (newVal) => {
 *          console.log('名字被修改了');
 *      }
 * });
 * =============================
 * Created by 王佳欣 on 2018/11/4.
 */
export default ({obj, key, before, callback}) => {
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

            if (before && !before(newVal)) {
                return false;
            }

            val = newVal;
            // 设置新值后，执行回调函数
            callback && callback(val);
        }
    });
};
