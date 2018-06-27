function fn(n){
  if(n===2||n===1){
    return 1;
  }
  return fn(n-1)+fn(n-2);
}

console.log(fn(4));

function fn2(n){
  if(n===2){
    return 4;
  }else if(n===1){
    return 2;
  }else{
    return fn2(n-1)*fn2(n-2);
  }
}

console.log(fn2(4));