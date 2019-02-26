function PromiseFn(func) {
    let callbacks = [];
    let status = 'pending';
    let result = null;

    // 处理
    let handler = function (callback) {
        if (status === 'pending') {
            callbacks.push(callback);
            return;
        }

        if (status === 'filled') {
            result = callback.onFill(result);
            return callback.resolve(result);
        }

        if (status === 'rejected') {
            result = callback.onReject(result);
            return callback.reject(result);
        }
    };

    this.then = function (onFill, onCatch) {
        return new Promise((resolve, reject) => {
            handler({
                onFill,
                onCatch,
                resolve,
                reject
            });
        });
    };

    let resolve = function (value) {
        if (value && value instanceof PromiseFn) {
            value.then.call(value, resolve, reject);
        }

        result = value;
        setTimeout(() => {
            status = 'filled';
            callbacks.map((callback) => {
                handler(callback);
            });
        }, 0);
    };

    let reject = function (value) {
        result = value;
        setTimeout(() => {
            status = 'rejected';
            callbacks.map((callback) => {
                handler(callback);
            });
        }, 0);
    };

    func(resolve, reject);
}

new PromiseFn((resolve, reject) => {
    console.log('step 0');
    resolve(1);
}).then((value) => {
    return new PromiseFn((resolve, reject) => {
        setTimeout(() => {
            resolve(value * 10);
        }, 1000);
    });
}).then((value) => {
    console.log('step 2');
    console.log(value);
});