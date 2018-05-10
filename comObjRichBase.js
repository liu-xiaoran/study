'use strict'
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


var RichBase = Base.extend({
  EVENTS: {},
  template: '',
  init: function(config){
    //存储配置项
    this._config = config;
    //解析代理事件
    this._delegateEvent();
    this.setUp();
  },
  //循环遍历EVENTS，使用Jq的delegate代理到parentNode
  _delegateEvent: function(){
    var self = this;
    var events = this.EVENTS || {};
    var eventObjs,fn,select,type;
    var parentNode = this.get('parentNode') || $(document.body);

    for(select in events){
      eventObjs = events[select];

      for(type in eventObjs){
        fn = eventObjs[type]
        parentNode.delegate(select,type,function(e){
          fn.call(null,self,e)
        })
      }

    }
  },
  //支持underscore的极简模板语法
  _parseTemplate: function(str,data){
    var fn = new Function('obj',
    'var p=[],print=function(){p.push.apply(p,arguments);};'+
    'with(obj){p.push(\'' + str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'") +
        "');}return p.join('');")

    return data?fn(data):fn;
  },
  //提供给子类覆盖实现
  setUp: function(){
    this.render()
  },
  //用来实现刷新
  setChuckdata: function(key,value){
    var self = this;
    var data = self.get('_renderData');
    data[key] = value;

    if(!this.template) return;
    //重新渲染
    var newHtmlNode = $(self._parseTemplate(this.template,data));
    //拿到存储的渲染后的节点
    var currentNode = self.get('_currentNode');
    if(!currentNode) return;
    //替换内容
    currentNode.replaceWith(newHtmlNode);
    self.set('_currentNode',newHtmlNode);
    parentNode.append(currentNode);

  },
  destroy: function(){
    var self = this;
    //去掉自身的事件监听
    var events = self.EVENTS || {};
    var eventObjs,fn,select,type;
    var parentNode = self.get('parentNode');
    for(select in events){
      eventObjs = events[select];
      for(type in eventObjs){
        fn = eventObjs[type];
        parentNode.undelegate(select,type,fn);
      }
    };

  }
})


//写成 RichBase组件
var TextCount = RichBase.extend({
  //事件直接在这注册，会代理到parentNode节点，parentNode节点在下面指定
  EVENTS: {
    //选择器字符串，支持所有的jq风格选择器
    'input':{
      keyup: function(self,e){
        //单向绑定，修改数据直接更新对应模板
        self.setChuckdata('count',self._getNum())
      }
    }
  },
  template: '<span id="J_input_count"><%= count %>个字</span>',
  //私有方法
  _getNum: function(){
    console.log(this);
    console.log(this.get('input'));
    console.log(this.get('input').val());

    return this.get('input').val().length || 0;
  },
  //覆盖实现setUp方法
  setUp: function(){
    var self = this;
    var input = this.get('parentNode').find('#J_input');
    self.set('input',input);

    var num = this._getNum();
    //赋值数据，渲染模板，选用。
    self.render({
      count: num
    });

  }
})

$(function(){
  new TextCount({
    parentNode: $('#J_text_container')
  });
})
