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

//扩展类编写代码
var TextCount = Class.extend({
  init: function(config){
    this.input = $(config.id);
    this._bind();
    this.render();
  },
  render: function(){
    var num = this._getNum();
    if($('#J_input_count').length == 0){
      this.input.after('<span id="J_input_count"></span>');
    };
    $('#J_input_count').html(num+'个字');
  },
  _getNum: function(){
    return this.input.val().length;
  },
  _bind: function(){
    var self = this;
    self.input.on('keyup', function(){
      self.render();
    });
  }
})
//执行
$(function(){
  new TextCount({
    id: "#J_input"
  });
})