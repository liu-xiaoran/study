'use strict';

//变量的声明方法 var function let const import class
let [a,b,c] = [1,2,3];
console.log([a,b,c]==[1,2,3]);
console.log(b==2);
let [x,y,...z] = ['a'];
console.log(x=="a",y==undefined,z.length==0);

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
};

let [first, second, third, fourth, fifth, sixth] = fibs();
console.log(first==0,second==1,third==1,fourth==2,fifth==3);
console.log(first,second,third,fourth,fifth,sixth);

let [x1,y1='b'] = ['a',undefined];
let [x2,y2='b'] = ['a',null];
console.log(x1=='a',y1=='b');
console.log(x2=='a',y2==null);

let { bar, foo } = { foo: "aaa", bar: "bbb" };
console.log(bar=='bbb',foo=='aaa');

//解构赋值时，不能将大括号写在行首

//将现有的对象的方法，赋值某个变量方便使用；
let{log,sin,cos} = Math;
console.log(log,sin,cos);
let arr = [1, 2, 3];
let {0 : first1, [arr.length - 1] : last} = arr;
console.log(first1==1); // 1
console.log(last==3); // 3
//undefined就会触发函数参数的默认值
var arr2= [1, undefined, 3].map((x = 'yes') => x);
console.log(arr2);
// [ 1, 'yes', 3 ]
// padStart(),padEnd() 补全字符串，前部补全尾部补全；

// 直接使用反斜号，其中变量使用 ${ 变量 }，其中还可以调用函数；
//		$('#list').html(`
//		<ul>
//		<li>first</li>
//		<li>second</li>
//		</ul>
//		`.trim());

// 写法一
let str2 = 'return ' + '`Hello ${name}!`';
let func2 = new Function('name', str2);
func2('Jack') // "Hello Jack!"

// 写法二
let str3 = '(name) => `Hello ${name}!`';
let func3 = eval.call(null, str3);
func3('Jack') // "Hello Jack!"

var total = 30;
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  var result = '';
  var i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }
  return result;
}
//  Number.isInteger()  判断是否为整数；
console.log(msg)  // "The total is 30 (31.5 with tax)"

//  引入Number.EPSILON 作为常量，来判断浮点数计算是否精确；
//  Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER 整数范围；
console.log( Number.EPSILON.toFixed(20) );

//  Math.trunc 去除一个数的小数部分，返回整数部分
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

//  Math.sign方法用来判断一个数到底是正数、负数、还是零
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};

//  Math.cbrt方法用于计算一个数的立方根
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};

//Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0

//  Math.hypot方法返回所有参数的平方和的平方根

//  Math.expm1(x)返回ex - 1，即Math.exp(x) - 1
Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};

//  Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)
Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};

//  Math.log10(x)返回以10为底的x的对数
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};

//  Math.log2(x)返回以2为底的x的对数
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};

//  Math.signbit()方法判断一个数的符号位是否设置
//  指数运算符（**），可以与等号结合，形成一个新的赋值运算符（**=）

//  console.log(typeof Integer(123)) 报错

console.log("-".repeat(60));

//  向函数传入任意数目的参数
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}

console.log(add(2, 5, 3,3))  // 10

// var f = v => v ;
var f = function(v){
	return v;
};
// var f = () => 5;
var f = function(){ return 5 };

// 之前写 vue 时，ES6情况下，name : funtion(){}； 可直接写为  name(){};

// 一般函数 var result = values.sort(function (a, b) { return a - b });
var result = values.sort((a,b) => a-b);

//箭头函数有几个使用注意点。
//（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
//（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
//（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
//（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出