/**
 * for：实现 javascript 观察者模式
 * demo ========================
 * let emitter = new Observer();
 * emitter.$on('broadcast', () => {
 *      console.log('broadcast');
 * });
 *
 * emitter.$emit();
 * =============================
 * Created by 王佳欣 on 2018/11/4.
 */
let Observer = function () {
    // 事件队列
    this._events = [];
};

// 添加订阅
Observer.prototype.$on = function (event, fn) {
    let self = this;

    if (!self._events[event]) {
        self._events[event] = [];
    }

    self._events[event].push(fn);
    return self;
};

// 添加只能触发一次的订阅
Observer.prototype.$once = function (event, fn) {
    let self = this;

    function on() {
        self.$off(event, on);
        fn.apply(self, arguments);
    }

    self.$on(event, on);
    return self;
};

// 移除订阅
Observer.prototype.$off = function (event, fn) {
    let self = this;
    let callbacks = self._events[event];
    if (!callbacks) {
        return false;
    }

    if (arguments.length === 1) {
        self._events[event] = null;
        return self;
    }

    let callback;
    let index = callbacks.length;

    while (index--) {
        callback = callbacks[index];
        if (callbacks === fn) {
            callbacks.splice(index, 1);
            break;
        }
    }

    return self;
};

// 触发订阅
Observer.prototype.$emit = function (event, ...args) {
    let self = this;

    let callbacks = self._events[event];
    if (callbacks) {
        callbacks.map((callback) => {
            // apply 绑定回调方法到当前observer
            // 不然callback会是匿名函数,this => undefined
            callback.apply(self, args);
        });
    }
    return self;
};

export default Observer;
