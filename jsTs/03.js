
var time = new Date()
console.log(time.getTime())
var timeEnd = new Date()

// Set结构不会添加重复的值
const s= new Set();
[2,3,5,4,5,2,2].forEach(x => s.add(x));
for(let i of s){
	console.log(i);
}
// 在列表中添加选项
//function insertBeforeSelected()
//{
//var x=document.getElementById("mySelect");
//if (x.selectedIndex>=0)
//  {
//  var y=document.createElement('option');
//  y.text='Kiwi';
//  var sel=x.options[x.selectedIndex];  
//  try
//    {
//    x.add(y,sel); // standards compliant
//    }
//  catch(ex)
//    {
//    x.add(y,x.selectedIndex); // IE only
//    }
//  }
//}
// Set内部使用的是 Same-value equality 类似于 === 但NaN等于自身；对象总是不相等；

//add(value)：添加某个值，返回Set结构本身。
//delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
//has(value)：返回一个布尔值，表示该值是否为Set的成员。
//clear()：清除所有成员，没有返回值。

// 数组去重方法，Array.from方法可以将 Set 结构转为数组；Array.from(arrayLike[, mapFn[, thisArg]])
function dedupe(array) {
  return Array.from(new Set(array));
}
console.log(dedupe([1, 1, 2, 3])) // [1, 2, 3]

//Set 结构的实例有四个遍历方法，可以用于遍历成员。
//keys()：返回键名的遍历器;
//values()：返回键值的遍历器; 可直接用for...of循环遍历 Set；
//entries()：返回键值对的遍历器;
//forEach()：使用回调函数遍历每个成员;
//使用扩展运算 ... 和 for...of循环 可数组去重；
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; //数组 map 和 filter 方法也可以用于Set；
// filter对数组中元素执行指定的函数（callback）并且创建一个新的数组，该数组元素是回调函数执行时返回 true 的原数组元素
// 做出Set 实现 并集（Union）、交集（Intersect）和差集（Difference）
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x))); // set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x))); // Set {1}

// 改变 Set 结构方法 ：
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2)); // set的值是2, 4, 6
// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2)); // set的值是2, 4, 6
// WeakSet是一个构造函数，不可遍历会回收；
//JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键；
//ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合；
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
// 只有对同一个对象的引用，Map 结构才将其视为同一个键
const map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
//上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined
// Map 的键实际上是跟内存地址绑定的，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
// Map结构的实例属性和方法
// size 属性返回 Map 结构的成员总数 map.size
// set(key,value) 已有会被更新，无则生成，可链式写法
// get(key) 读取键值，无则返回undefined
// has(key) 返回布尔值，表示某个键是否在当前Map对象中
// delete(key) 删除某个键，返回true，删除失败返回false
// clear() 清除所有成员
// 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);  // 产生 Map 结构 {1 => 'a', 2 => 'b'}
const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
); // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
//  forEach 第一个参数遍历函数，第二个用来绑定this；
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
// WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性
//对比数组的 map 
let array = arr.map(function callback(currentValue, index, array) { 
    // Return element for new_array 
}[, thisArg])