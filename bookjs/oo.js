//直接创建对象
var person1 = new Object();
person1.name = 'zz';
person1.age = 29;
person1.job = 'Software Engineer';
person1.sayName = function(){
  console.log(this.name);
}

//对象字面量语法
var person = {
  name: 'zz',
  age: 29,
  job: 'Engineer',
  sayName: function(){
    console.log(this.name);
  }
}
