//component类，用来表示文本在渲染，更新，删除时应该做什么事情
function ReactDOMTextComponent(text) {
  //存下当前的字符串
  this._currentElement = '' + text;
  //标识当前component
  this._rootNodeID = null;
};

//component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootNodeID = rootID;
  return `<span data-reactid='${rootID}'>${this._currentElement}</span>`
};
//component类
function ReactDOMComponent(ele){
  //存下当前对象引用
  this._currentElement = ele;
  this._rootNodeID = null;
}
//component渲染时生成dom结构
ReactDOMComponent.prototype.mountComponent = function(rootID){
  this._rootNodeID = rootID;
  var props = this._currentElement.props;
  var tagOpen = `<${this._currentElement.type}`;
  var tagClose = `</${this._currentElement.type}>`;
  //加上reactid标识
  tagOpen += ' data-reactid=' + this._rootNodeID;
  //拼凑出属性
  for(var propKey in props){
    //从属性中解析出on开头的事件属性
    if(/^on[A-Za-z]/.test(propKey)){
      var eventType = propKey.replace('on','');
      //针对当前的节点添加事件代理，以_rootNodeID为空间
      $(document).delegate(`[data-reactid="${this._rootNodeID}"]`,eventType+'.'+this._rootNodeID,props[propKey]);

      // $(document).delegate(`[data-reactid="${this._rootNodeID}"]`,eventType+'.'+this._rootNodeID,props[propKey]);
    }
    //对于children属性监听不需要进行进行字符串拼接
    if(props[propKey]&&propKey!='children'&&!/^on[A-Za-z]/.test(propKey)){
      tagOpen+=' '+propKey+'='+props[propKey];
    }
  }
  //获取子节点渲染出的内容
  var content = '';
  var children = props.children || [];
  var childrenInstances = []; //用于保存所有的子节点componet实例
  var that = this;
  $.each(children,function(key,child){

    //调用instantiateReactComponent实例化子节点component类
    var childComponentInstance = instantiateReactComponent(child);

    childComponentInstance._mountIndex = key;
    childrenInstances.push(childComponentInstance);
    //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
    var curRootId = that._rootNodeID+'.'+key;
    //得到子节点的渲染内容
    var childMarkup = childComponentInstance.mountComponent(curRootId);
    //进行拼接一起
    content += ' '+childMarkup;

  });
  //留作以后更新时的内容
  this._renderedChildren = childrenInstances;
  
  //拼接返回整个html内容
  return tagOpen+'>'+content+tagClose;

}

//component工厂 用来返回一个component实例
function instantiateReactComponent(node) {
  //文本节点
  if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDOMTextComponent(node)
  }
  //浏览器节点
  if(typeof node === 'object' && typeof node.type === 'string'){
    return new ReactDOMComponent(node);
  }
};

//ReactEle虚拟dom的概念，具有type属性代表当前节点类型，还有节点的属性props
//type标识标签，props代表attributes，key主要用于优化更新
function ReactElement(type,key,props){
  this.type = type;
  this.key = key;
  this.props = props;
}

React = {
  nextReactRootIndex: 0,
  createElement: function(type,config,children){
    var props = {},propName;
    config = config || {};
    //如果有key用来标识ele的类型
    var key = config.key || null;
    //复制config内容到props
    for(propName in config){
      if(config.hasOwnProperty(propName) && propName !== 'key'){
        props[propName] = config[propName];
      }
    }
    //处理children,全部挂载到props的children属性上
    var childrenLength = arguments.length -2;
    if(childrenLength === 1){
      props.children = $.isArray(children) ? children : [children];
    }else if(childrenLength>1){
      var childArray = Array(childrenLength);
      for (var i=0;i<childrenLength;i++){
        childArray[i] = arguments[i+2];
      }
      props.children = childArray;
    }

    return new ReactElement(type,key,props);
  },
  render: function(ele,container){
    var componentInstance = instantiateReactComponent(ele);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    $(container).html(markup);
    //完成后触犯mount的事件
    $(document).trigger('mountReady');
  }
};