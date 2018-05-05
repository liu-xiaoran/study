var TextCount = (function(){
  //私有方法，外面访问不到
  var _bind = function(that){
    that.input.on('keyup',function(){
      that.render();
    });
  }

  var _getNum = function(that){
    return that.input.val().length;
  }

  var TextCountFun = function(config){

  }
  TextCountFun.prototype.init = function(config){
    this.input = $(config.id);
    _bind(this);

    return this;
  };

  TextCountFun.prototype.render = function(){
    var num = _getNum(this);
    if($('#J_input_count').length == 0){
      this.input.after('<span id="J_input_count"></span>');
    };
    $('#J_input_count').html(num+'个字');
  };
  //返回构造函数
  return TextCountFun;

})();

$(function(){
  new TextCount().init({id: '#J_input'}).render();
});