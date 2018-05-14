//简单定义的类原型上多余属性和构造函数都是不我们希望看到的
// var F = function(){};
// F.prototype = Animal.prototype;
// Dog.prototype = new F();
// Dog.prototype.constructor = Dog;

//对以上的原理封装
function objCreate(prototype){
  var F = function(){};
  F.prototype = prototype;
  return new F();
};
function inherit(subclass,parentclass){
  subclass.prototype = objCreate(parentclass.prototype);
  subclass.prototype.constructor = subclass;
};
//继承的书写
function Animal(name){
  this.name = name;
};
Animal.prototype.run = function(){
  console.log(this.name+' is running!!');
};
function Dog(name){
  //调用父类构造函数，通过this指向将属性赋值到新对象
  Animal.call(this,name);
};
inherit(Dog,Animal);

var dog = new Dog('dog');
var dog2 = new Dog('cat');
Dog.prototype.a = 1;
dog.run();

console.log(dog.a);
console.log(dog2.a);
console.log(dog.constructor);
//此方法将创建原型变成子类