var textCount = {
  input: null,
  init: function(config){
    this.input = $(config.id);
    this.bind();
    //返回对应对象，链式调用
    return this;
  },
  bind: function(){
    var self = this;
    this.input.on('keyup',function(){
      self.render();
    });
  },
  getNum: function(){
    return this.input.val().length;
  },
  //渲染元素
  render: function(){
    var num = this.getNum();

    if($('#J_input_count').length == 0){

      this.input.after('<span id="J_input_count"></span>')
    };
    $('#J_input_count').html(num+'个字');
  }
}

$(function(){
  //在domready后调用
  textCount.init({id: '#J_input'}).render();
})