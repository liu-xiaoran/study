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
    while (item = items.shift()){
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

    return SubClass;
  }
  //超级父类
  var Class = function(){};
  Class.extend = _extend;

  return Class;
})()

//抽象出来Base
var Base = Class.extend({
  init: function(config){
    //保存配置项
    this._config = config;
    this.bind();
    this.render();
  },
  //使用get获取配置项
  get: function(key){
    return this._config[key];
  },
  //使用set来设置配置项
  set: function(key,value){
    this._config[key] = value;
  },
  bind: function(){

  },
  render: function(){

  },
  //定义销毁方法，收尾工作在这处理
  destroy: function(){

  }
})

//编写实际业务
var TextCount = Base.extend({
  _getNum: function(){
    return this.get('input').val().length;
  },
  bind: function(){
    var self = this;
    self.get('input').on('keyup',function(){
      self.render();
    });
  },
  render: function(){
    var num = this._getNum();
    if($('#J_input_count').length == 0){
      this.get('input').after('<span id="J_input_count"></span>');
    };
    $('#J_input_count').html(num+'个字');
  }
});

$(function(){
  new TextCount({
    input: $('#J_input')
  })
});