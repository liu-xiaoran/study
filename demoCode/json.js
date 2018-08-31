let arr = "[1L, 2L, 3L, 4L, 4L]";
arr = arr.replace(/L/g, '');
console.log(arr);
let arrJson = JSON.parse(arr);
// parse可以解析字符串
console.log(arrJson);