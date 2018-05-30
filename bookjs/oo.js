//直接创建对象
var person1 = new Object();
person1.name = 'zz';
person1.age = 29;
person1.job = 'Software Engineer';
person1.sayName = function(){
  console.log(this.name);
};


//对象字面量语法
var person2 = {
  name: 'zz',
  age: 29,
  job: 'Engineer',
  sayName: function(){
    console.log(this.name);
  }
};


//工厂模式
function createPerson(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this.name);
  };
  return o;
};
var person3 = createPerson('zzz',30, 'eng');


//构造函数模式,构造函数以大写字母开头
function Person1(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    console.log(this.name);
  };
};
var person4 = new Person1('zz', 31, 'ee');
console.log(person4.constructor === Person1);


//原型模式
function Person2(){
}
Person2.prototype.name = 'zz';
Person2.prototype.age = 30;
Person2.prototype.job = 'eee';
Person2.prototype.sayName = function(){
  console.log(this.name);
};
var person5 = new Person2();
console.log(!person5.hasOwnProperty('name')&&('name' in person5));
//简化的原型模式
function Person3(){
}
Person3.prototype = {
  name: 'cc',
  age: 31,
  job: 'ebf',
  sayName: function(){
    console.log(this.name);
  }
};
Object.defineProperty(Person3.prototype, 'constructor', {
  enumerable: false,
  value: Person3
})


//组合使用构造函数和原型模式，构造用于定义实例属性，原型用于定义方法和共享属性
function Person4(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['ss','zz'];
}
Person4.prototype = {
  sayName: function(){
    console.log(this.name);
  }
}
Object.defineProperty(Person4.prototype, 'constructor', {
  enumerable: false,
  value: Person4
})
var person6 = new Person4('zz', 32, 'egg')


//动态原型模式
function Person5(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  if(typeof this.sayName != 'function'){
    Person5.prototype.sayName = function(){
      console.log(this.name);
    }
  }
}


//寄生构造函数模式
function Person6(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this.name);
  }
  return o;
}


//组合继承
function SuperType(name){
  this.name = name;
  this.colors = ['red','blue','green'];
};
SuperType.prototype.sayName = function(){
  console.log(this.name);
};
function SubType(name, age){
  //继承属性
  SuperType.call(this, name);
  this.age = age;
};
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function(){
  console.log(this.age);
};
var instance1 = new SubType('zz', 29);
instance1.colors.push('black');
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();
var instance2 = new SubType('cc', 30);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();


//寄生组合继承
function SuperType1(name){
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
};
SuperType1.prototype.sayName = function(){
  console.log(this.name);
};
function SubType1(name, age){
  SuperType1.call(this, name);   //第2次调用SuperType1
  this.age = age;
};
SubType1.prototype = new SuperType1();   //第1次调用SuperType1
SubType1.prototype.constructor = SubType1;
SubType1.prototype.sayAge = function(){
  console.log(this.age);
};
var instance3 = new SubType1('bb', 31);
console.log(instance3.colors);
instance3.sayName();
instance3.sayAge();