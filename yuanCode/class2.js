//kissy的类继承的实现
function objCreate(prototype, construct) {
  var F = function () {};
  F.prototype = prototype;
  var newPro = new F();
  newPro.construct = construct; //维护构造函数的改变
  return newPro;
};
//辅助方法，浅拷贝，暂不考虑深度
function mix(r, s) {
  for (var p in s) {
    if (s.hasOwnProperty(p)){
      r[p] = s[p]
    }
  };
};
//kissy库的实现，r代表子类 s代表父类 px代表最后会混入子类原型的属性 sx代表会混入函数上的属性
function extend(r,s,px,sx){
  if(!s||!r){
    return r;
  };
  var sp = s.prototype,rp;
  //针对父类生成一个原型。
  rp = objCreate(sp,r);

  r.prototype = s.mix
}

//具体实现请参照kissy源码，文章中写的较为紊乱。