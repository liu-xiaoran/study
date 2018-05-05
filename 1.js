//构造函数的属性
function Foo(){};
let f1 = new Foo;
console.log(f1.constructor===Foo);

Foo.prototype.a = 1;
Foo.prototype.b = 2;
console.log(f1.a);
console.log(f1.b);
f1.c = 3;

let f2 = Object.create(f1);
console.log(f2.a);
console.log(f2.b);
console.log(f2.c);

console.log(f2.__proto__);
console.log(f1.__proto__);
console.log(Foo.prototype);

console.log(f1.constructor);
console.log(f2.constructor);
console.log(Object.prototype);
// f1.prototype.b = 2;
// console.log(f1.b);

//构造函数的属性
function Foo(){};
Foo.prototype.a = 1;
let f1 = new Foo;
let f2 = Object.create(f1); //创造，跟改此函数原不会变
let f3 = f1;  //指向，更改此函数原会变
f3.a = 2;
console.log(f1.a);
console.log(f2.a);
console.log(f3.a);