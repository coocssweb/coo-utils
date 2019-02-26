function PromiseNew(fn) {
    let callbacks = [];
    let result;
    let status = 'pending';

    function handler(callback) {
        // pending
        if (status === 'pending') {
            callbacks.push(callback);
            return;
        }

        if (status === 'fullFilled') {
            let value = callback.onFill(result);
            result = callback.onResolve(value);
        } else if (status === 'fullRejected') {
            let value = callback.onError(result);
            result = callback.onReject(value);
        }
    }
    
    this.then = function (fill, error) {
        // 因为then里有时候，也有异步操作
        // 因此回调必须是Promise
        return new PromiseNew((resolve, reject) => {
            handler({
                onFill: fill,
                onError: error,
                onResolve: resolve,
                onReject: reject,
            })
        });
    };
    
    function resolve(value) {
        status = 'fullFilled';
        // fill一个Promise
        // 需要将此Promise resolve的值，传给then
        if (value instanceof PromiseNew) {
            value.then.call(value, resolve, reject);
            return;
        }

        result = value;
        setTimeout(() => {
            callbacks.map((callback) => {
                handler(callback);
            });
        }, 0);
    }
    
    function reject(value) {
        status = 'fullRejected';

        result = value;
        setTimeout(() => {
            callbacks.map((callback) => {
                handler(callback);
            });
        }, 0);
    }

    fn(resolve, reject);
}

PromiseNew.all = function (...args) {
    function Do() {
        const count = args.length;
        let results = [];
        let haveResolved = 0;
        let done;
        this.then = function(fn) {
            done = fn;
        };
        
        function resolved(result) {
            results.push(result);
            haveResolved++;
            if (haveResolved === count) {
                done(...results);
            }
        }

        for (let item of args) {
            item().then((result) => {
                resolved(result);
            }, (error) => {
                resolved(error);
            });
        }
    }
    return new Do();
};


// let testPromise = function () {
//     return new PromiseNew((resolve, reject) => {
//         console.log(`step-0`);
//         setTimeout(() => {
//             resolve(1000);
//         }, 1000);
//     });
// };
//
// testPromise().then((result) => {
//     // console.log(`step-1: ${result}`);
//     // return 2 * result;
//     return new PromiseNew((resolve, reject) => {
//         console.log(`step-1: ${result}`);
//         resolve(2 * result);
//     });
// }).then((result) => {
//     console.log(`step-2: ${result}`);
//     return 2 * result;
// });

let test01 = function () {
    return new PromiseNew((resolve, reject) => {
        setTimeout(() => {
            resolve(1000);
        }, 500);
    });
};

let test02 = function () {
    return new PromiseNew((resolve, reject) => {
        setTimeout(() => {
            resolve(2000);
        }, 1000);
    });
};

PromiseNew.all(test01, test02).then((...args) => {
    console.log(...args);
});
