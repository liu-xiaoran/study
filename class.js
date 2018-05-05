//简单的模拟Class
// function Animal(name){
//   this.name = name;
//   this.run = function(){
//     console.log(this.name+' is running!!');
//   };
// }

// var pet = new Animal('pet');
// pet.run();

//使用原型链
function Animal(name){
  this.name = name;
};
Animal.prototype.run = function(){
  console.log(this.name+' is running!!');
};
function Dog(name){
  //调用父类构造函数，改变this指向将属性赋值到新的实例对象
  Animal.call(this,name);
};

Dog.prototype = new Animal();
Dog.prototype.a = 2;
var dog = new Dog('dog');
var dog2 = new Dog('cat');
dog.run();
console.log(Animal.a);
console.log(Dog.a);
console.log(dog.a); //方法会追诉到子类再追诉到父类
console.log(dog2.a);
console.log(dog.constructor);
