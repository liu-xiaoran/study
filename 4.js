//闭包  闭包就是能够读取其他函数内部变量的函数
function f1(){
  let n = 999;
  function f2(){
    return n;
  };
  return f2;
};
let result = f1();
console.log(result());
//代码1
var name = 'The Window';
var object1 = {
  name: 'The Obj',
  getNameFunc: function(){
    return function(){
      return this.name;
    };
  }
};
console.log(object1.getNameFunc().call(object1));
//代码2
var object2 = {
  name: 'My Obj',
  getNameFunc: function(){
    // var that = this;
    // return function(){
    //   return this.name;
    // }
    return ()=>this.name
  }
}
console.log(object2.getNameFunc()());