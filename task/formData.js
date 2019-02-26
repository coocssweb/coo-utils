// let formData = new FormData();
// formData.append("username", "Groucho");
// formData.append("accountnum", 123456);
// console.log(formData);

// let file = document.querySelector('.file');
// file.onchange = function () {
//     let reader = new FileReader();
//     reader.readAsDataURL(file.files[0]);
//     console.log(file.files[0]);
//     reader.onload = function (e) {
//         // console.log(reader.result);
//     }
// };
function curry (fn, arity = fn.length, ...args) {
    if (arity < args.length) {
        return fn(...args);
    } else {
        return curry.bind(null, fn, arity, ...args);
    }
}

// let result = curry(Math.pow)(2)(10);

function ok(...args) {
    console.log(args.length);
}

let s = ok.bind(null, 1).bind(null, 2).bind(null, 3);
s();
