//面向对象，实现简单的javascript类：
//辅助函数
var _indexOf = function(array,key){
  if (array === null) return -1;
  var i = 0,length = array.length;
  for(;i<length;i++) if (array[i]===key) return i;
  return -1;
}

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

//定义绑定函数
var Event = Class.extend({
  //添加监听
  on: function(key,listener){
    //this._enents存储所有的处理函数
    if(!this._events){
      this._events = {}
    }
    if(!this._events[key]){
      this._events[key] = []
    }
    if(_indexOf(this._events,listener) === -1 && typeof listener === 'function'){
      this._events[key].push(listener)
    }

    return this;
  },
  //触发一个事件
  fire: function(key){
    if(!this._events||!this._events[key]) return;

    var args = Array.prototype.slice.call(arguments, 1) || [];

    var listeners = this._events[key];
    var i = 0;
    var l = listeners.length;

    for(i;i<l;i++){
      listeners[i].apply(this,args)
    }

    return this;
  },
  //取消监听
  off: function(key,listener){
    if(!key && !listener){
      this._events = {}
    }
    //不传监听函数，去除key下面所有的监听函数
    if(key&&!listener){
      delete this._events[key]
    }
    if(key&&listener){
      var listeners = this._events[key];
      var index = _indexOf(listeners,listener)

      (index>-1)&&listeners.splice(index,1)
    }

    return this;
  }

})

//抽象出来Base
var Base = Class.extend(Event,{
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
    this.off()
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
      //通知，有输入时就报告出去
      self.fire('Text.input',self._getNum())
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

//执行函数
$(function(){
  var t= new TextCount({
    input: $('#J_input')
  })
  t.on('Text.input',function(num){
    if(num>5){
      alert('超过了5个字了哈')
    }
  })
});
