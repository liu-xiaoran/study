"use strict"

console.log(...[1,2,3])
console.log(...[1,2,[3,4]])

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr1,arr2);
// Array.from 替代办法
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
// 以下代码中，Array.from的第一个参数指定了第二个参数运行的次数
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
function countSymbols(string) {
  return Array.from(string).length;
}
console.log(countSymbols("hello"));

// Array.of方法用于将一组值，转换为数组 Array.of基本上可以用来替代Array()或new Array()
// Array.prototype.copyWithin(target, start = 0, end = this.length)
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
//寻找find方法，用于找出第一个符合条件的数组成员，无返回undefined
[1, 4, -5, 10].find((n) => n < 0)  // -5
// 数组实例化 fill()；以下为对数组 遍历 的方法
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}  // 0 1 

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}  // 'a' 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}  // 0 "a"  1 "b"
// includes 来检查数组中的元素；以下简易版本；
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false

//Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
//Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

// 对象的简介写法
// 1，简介写法的属性名总是字符串，所以不会因为它属于关键字，而导致语法解析报错。Generator函数，前面需要加上星号。
// 2，ES6允许使用表达式作为对象属性名，将其放在[方括号]内；
// 3，使用取值函数（getter）和存值函数（setter）；
const obj = {
  get foo() {},
  set foo(x) {}
};
//obj.foo.name
// TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
// Object.is，一是+0不等于-0，二是NaN等于自身；
// 对象的合并   使用此方法拷贝时是浅拷贝；
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
console.log(target) // {a:1, b:2, c:3}
// 克隆对象包括其继承的值
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
// 将多个对象合并某个新对象
const merge =
  (...sources) => Object.assign({}, ...sources);
// 为属性指定默认值   DEFAULTS对象是默认值，options对象是用户提供的参数
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
}