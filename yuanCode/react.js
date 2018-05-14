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

//component工厂 用来返回一个component实例
function instantiateReactComponent(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDOMTextComponent(node)
  }
};

React = {
  nextReactRootIndex: 0,
  render: function(ele,container){
    var componentInstance = instantiateReactComponent(ele);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    $(container).html(markup);
    $(document).trigger('mountReady');
  }
};