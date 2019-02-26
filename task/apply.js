// call 原理
// Function.prototype.call2 = function (context, ...args) {
//     let fnName = Symbol();
//     context[fnName] = this;
//     context[fnName](...args);
//     delete context[fnName];
// };
//
// // apply 原理
// Function.prototype.apply2 = function (context, args = []) {
//     let fnName = Symbol();
//     context[fnName] = this;
//     context[fnName](...args);
//     delete context[fnName];
// };
//
// // bind 原理
// Function.prototype.bind2 = function (context, ...args) {
//     let self = this;
//     let fn = function (...innerArgs) {
//         return self.apply(this instanceof fn ? window : context, [...args, ...innerArgs]);
//     };
//
//     let deFn = function () {};
//     deFn.prototype = context.prototype;
//     fn.prototype = new deFn();
//     return fn;
// };
//
// // new 原理
// function new2(context, ...args) {
//     // call，继承context 属性
//     let fn = {};
//     context.call(fn, ...args);
//     // context 的原型链
//     fn.__proto__ = context.prototype;
//     return fn;
// }
//
// function Animal(sound, name) {
//     this.sound = sound;
//     this.name = name;
// }
//
// Animal.prototype.shout = function () {
//     console.log(this.sound);
// };
//
// Animal.prototype.showName = function () {
//     console.log(`I am ${this.name}`);
// };
//
// function Dog(sound) {
//     Animal.call(this, sound);
//     this.name = 'dog';
// }
//
// let fn = function () {};
// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;
//
// let dog = new Dog('wang wang ...');
// dog.shout();
// dog.showName();
//
// console.log(dog instanceof Dog);

// 原型链
// person
// person.__proto__
// Person
// Person.prototype
// Person.prototype.constructor
// person.prototype.__proto__
// Object.prototype
// Object.prototype.__proto__ === null

// 变量提升
// 作用域
// 作用域链
// 执行栈
// 上下文
// 事件循环机制

// javascript 是词法语法，变量的作用域在声明的时候已经决定了。
// js解析代码分为，全局解析，方法解析，eval解析
// 每次进入一个方法，向执行栈push一个执行区，准备变量，变量声明，保存一个指向父作用域的指针
// 执行完后，pop该执行区

Object.create2 =  function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
};

let data =  function () {
    this.a = 1;
}
let s2 = Object.create(data);
let s =  Object.create2(data);

console.log(s2, s, s.a);