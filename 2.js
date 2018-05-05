//排序
let numArr = [4, 2, 5, 11, 64, 7, -3];
let [...newArr] = numArr;
let new2Arr = numArr.slice();
let new3Arr = numArr.valueOf(); //会改变原数组
newArr.sort(
  (a,b) => b-a
);
new2Arr.sort(
  (a,b) => a-b
);
new3Arr.sort(
  (a,b) => b-a
);
console.log(numArr);
console.log(newArr);
console.log(new2Arr);
console.log(new3Arr);

let sortObj = {
  'a': {id:233},
  'c': {id:23},
  'b': {id:2333}
};
let newObj = JSON.parse(JSON.stringify(sortObj));
newObj.a.id = 33;
newObj.c = 2;

console.log(sortObj);
console.log(newObj);