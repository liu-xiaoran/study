function fn(n){
  if(n===2||n===1){
    return 1;
  }
  return fn(n-1)+fn(n-2);
}

console.log(fn(4));