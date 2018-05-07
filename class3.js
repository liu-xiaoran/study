//显示科技的oo实现，一个番茄
//John的实现方法
var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});

var Ninja = Person.extend({
  init: function(){
    this._super(false);
  },
  dance: function(){
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});

var p = new Person(true);
p.dance(); // => true

var n = new Ninja();
n.dance(); // => false
n.swingSword(); // => true

//Should all be true
p instanceof Person && p instanceof Class && n instanceof Ninja && n instanceof Person && n instanceof Class

//Class类的源码
(function(){
  //对于一些浏览器
  var initializing = false,fnTest = /xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;
  //The base Class
  this.Class = function(){};
  //Create a new Class that inherits from this class
  Class.extend = function(prop){
    //this指向父类，初次时指向Class超级父类
    var _super = this.prototype;
    initializing = true;
    var prototype = new this();
    initializing = false;
    //copy the properties over onto the new prototype
    for(var name in prop){
      prototype[name] = typeof prop[name] == 'function' && fnTest.test() ?
      (function(name, fn){
        //通过闭包,返回一个新的操作函数，可以做额外处理
        return function(){
          var tmp = this._super;
          // Add a new ._super.调用函数时，会给this注入一个_super方法来调用父类的同名方法
          this._super = _super[name];

          var ret = fn.apply(this, arguments);
          //离开时，恢复值
          this._super = tmp;
          
          return ret;
        };
      })(name, prop[name]) : prop[name];
    }
    //这边返回类
    function Class(){
      if( !initializing && this.init){
        this.init.apply(this, arguments);
      }
    }
    //赋值原型链，完成继承
    Class.prototype = prototype;
    //改变constructor引用
    Class.prototype.constructor = Class;
    //为子类也添加extend方法
    Class.extend = arguments.callee;

    return Class;
  };
})();