var a = 2;
//a在自己的定义域内，所以前两个都是undefined
(function() {
    console.log(a);
    if (!a) {
        var a;
    }
    console.log(a);
})();
console.log(a);

var b = 3;
//b已经定义，所以重新定义后依然输出3，重新定义的命令无效
console.log(b);
if (!b) {
    var b;
}
console.log(b);
var b;
console.log(b);
var b = 4;
console.log(b);