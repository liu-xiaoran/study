//阶乘函数
function factorial(num){
  if(num <= 1){
    return 1;
  }else{
    return num*factorial(num-1);
  }
}
console.log(factorial(5));
//消除耦合影响，使用 callee,指向拥有arguments对象的函数
function nowFactorial(num){
  if(num<=1){
    return 1;
  }else{
    return num*arguments.callee(num-1);  //未使用函数名，解耦了
  }
}
console.log(nowFactorial(5));