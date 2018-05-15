//provide功能
// 注册组件(directives,services和controllers)
// 解决各个组件之间的依赖关系
// 初始化所有组件

//因此它具有下面接口
// get(name,locals) - 通过名称还有本地依赖返回对应的service
// invoke(fn,locals) - 通过service对应的工厂函数还有本地依赖初始化service
// directive(name,fn) - 通过名称还有工厂函数注册一个directive
// controller(name,fn) - 通过名称还有工厂函数注册一个controller，注意angularjs的代码并没有controllers
// service(name,fn) - 通过名称还有工厂函数注册一个service
// annotate(fn) - 返回一个数组，数组里是当前service依赖的模块的名称

var Provider = {
  _providers:{},
  directive: function(name, fn){
    this._register(name+Provider.DIRECTIVES_SUFFIX,fn);
  },
  controller: function(name,  fn){
    this._register(name+Provider.CONTROLLERS_SUFFIX,function(){
      return fn;
    });
  },
  service: function(name, fn){
    this._register(name, fn);
  },
  _register: function(name, factory){
    this._providers[name] = factory;
  },
  get: function(name, locals){
    if(this._cache[name]){
      return this._cache[name];
    }
    var provider = this._providers[name];
    if(!provider||typeof provider !== 'function'){
      return null;
    }
    return (this._cache[name] = this.invoke(provider,locals));
  },
  annotate: function(fn){
    var res = fn.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
        .match(/\((.*?)\)/);
    if(res&&res[1]){
      return res[1].split(',').map(function(d){
        return d.trim();
      });
    }
    return [];
  },
  invoke: function(fn, locals){
    locals = locals || {};
    var deps = this.annotate(fn).map(function(s){
      return locals[s] || this.get(s, locals);
    },this);
    return fn.apply(null, deps);
  },
  _cache: {
    $rootScope: new Scope()
  }
};
Provider.DIRECTIVES_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

