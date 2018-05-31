//递归函数
function factorial(num){
  if(num<=1){
    return 1;
  }else{
    return num*arguments.callee(num-1);
  }
}
//严格模式下修改
var factorial1 = (function f(num){
  if(num<=1){
    return 1;
  }else{
    return num*f(num-1);
  };
});
console.log(factorial1(4));


//私有方法
function MyObject(){
  //私有变量和私有函数
  var privateVariable = 10;
  function privateFunction(){
    return false;
  }
  //特权方法
  this.publicMethod = function(){
    privateVariable++;
    return privateFunction();
  }
}


//单例
var singleton = {
  name: 'value',
  method: function(){
  }
};
//单例模块模式
var singleton1 = function(){
  //私有变量和私有函数
  var privateVariable = 10;
  function privateFunction(){
    return false;
  };
  //特权/公有方法和属性
  return {
    publicProperty: true,
    publicMethod: function(){
      privateVariable++;
      return privateFunction();
    }
  };
}();
//单例管理应用级
var application = function(){
  //私有变量和函数
  var components = new Array();
  //初始化
  components.push(new BaseComponent());
  //公共
  return {
    getComponentCount: function(){
      return components.length;
    },
    registerComponent: function(component){
      if(typeof component == 'object'){
        components.push(component);
      }
    }
  };
}();


//增强的模块模式
var singleton2 = function(){
  //私有变量和私有函数
  var privateVariable = 10;
  function privateFunction(){
    return false;
  }
  //创建对象
  var object = new CustomType();
  //添加特权/公有属性和方法
  object.publicProperty = true;
  object.publicMethod = function(){
    privateVariable++;
    return privateFunction();
  };
  //返回这个对象
  return object;
}();


//增强的应用级
var application2 = function(){
  //私有变量和函数
  var components = new Array();
  //初始化
  components.push(new BaseComponent());
  //创建application的局部副本
  var app = new BaseComponent();
  //公共接口
  app.getComponentCount = function(){
    return components.length;
  };
  app.registerComponent = function(component){
    if(typeof component == 'object'){
      components.push(component)
    }
  };
  return app;
}();