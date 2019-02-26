Array.prototype.reduceFn = function (fn, initialValue) {
    let result;
    let currentIndex;
    let self = this;
    if (initialValue) {
        currentIndex = 0;
        result = initialValue;
    } else {
        currentIndex = 1;
        result = self[0]
    }

    for (let index = currentIndex; index < self.length; index++) {
        result = fn(result, self[index], index, self);
    }

    return result;
};

let numbers = [1, 2, 3, 4, 5];
let result = numbers.reduceFn((prev, currentValue, currentIndex, array) => {
    return prev + currentValue;
}, 0);

console.log(result);
