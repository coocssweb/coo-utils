// arrayLike
// iterator 迭代器
let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length : 3,
    [Symbol.iterator]: function () {
        let currentIndex = 0;
        let self = this;
        return {
            next: function () {
                currentIndex += 1;
                if (currentIndex <= self.length) {
                    return {
                        done: false,
                        value: self[`${currentIndex - 1}`]
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }
};

for (let item of arrayLike) {
    console.log(item);
}


// generator
function * testGenerator(a) {
    let b = 2 * (yield a);
    yield 2;
    yield 3;
    return 4;
}

let xx = testGenerator(10);
// console.log(xx.next(5));
// console.log(xx.next(15));
// console.log(xx.next());
// console.log(xx.next());

for (let item of xx) {
    console.log(item);
}


// async
let resolve = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    });
};

function *test2() {
    yield resolve();
    console.log('222222');
}

let ss = test2();
let value = ss.next();
value.value.then((result) => {
    console.log('dddd', result);
});

ss.next();

async function test() {
    console.log(1000);
    let result = await resolve();
    console.log(result);
    return result;
}

let result = test();
result.then((value) => {
    console.log(value);
});

console.log('5000');
