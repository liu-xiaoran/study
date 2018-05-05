//面向对象，实现简单的javascript类：

var Class = (function(){
  var _mix = function(r,s){
    for(var p in s){
      if(s.hasOwnProperty(p)){
        r[p] = s[p]
      }
    }
  }

  var _extend = function(){
    //开关 用来使生成原型时，不调用真的构成流程init
    this.initPrototype = true;
    var prototype = new this();
    this.initPrototype = false;

    var items = Array.prototype.slice.call(arguments) || [];
    var item;
    //支持混入多个属性且支持{}也支持Function
    while (item = item.shift()){
      _mix(prototype, item.prototype || item)
    };

    //返回的类，实际为返回的子类
    function SubClass(){
      if(!SubClass.initPrototype&&this.init){
        this.init.apply(this,arguments) //调用init真正的构造函数
      }
    }
    //赋值原型，完成继承
    SubClass.prototype = prototype;

    //改变constructor引用
    SubClass.prototype.constructor = SubClass;

    //为子类也添加extend方法
    SubClass.extend = _extend;

    return Class;
  }

})()