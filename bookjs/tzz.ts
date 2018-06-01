//简单定义字符串的正则表达式
let oldDate: string = 'User-Agent: Mozilla/5.0 (Linux; Android 7.1.2; MI 5X Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/64.0.3282.137 Mobile Safari/537.36 zylcapp/3.0.1 deviceId/5f4181f7c5bd1b35c10facad663c048d sarg1/865722037642926'

let deviceId: string = oldDate.replace(/^.*deviceId\/([\S.]+).*$/, '$1')
console.log(deviceId);

//使用TS编写个类
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  };
  sayName() {
    console.log("my name is "+this.name);
  };
};

class Dog extends Person {
  sayCc() {
    console.log('cc');
  }
}

const dog = new Dog('gg');
const ren = new Person('zz');

dog.sayName()
ren.sayName()
dog.sayCc()