function compose(fns) {
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


let fn1 = async function (value, next) {
    console.log('step-1-enter');
    console.log(value);
    next();
    console.log('step-1-quit');
};

let fn2 = async function (value, next) {
    console.log('step-2-enter');
    console.log(value);
    next();
    console.log('step-2-quit');
};

let fn3 = async function (value, next) {
    console.log('step-3-enter');
    console.log(value);
    next();
    console.log('step-3-quit');
};

let s = compose([fn1, fn2, fn3]);
s(1);
