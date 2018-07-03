/**
 * Created by dell-zhangyue on 2017/7/27.
 */
var myNumber = 'seven'; // 声明时未赋值未指定类型也为任意值类型。
myNumber = 4; // any类型可以任意赋值；可以调用任何属性，对它的任何操作返回的内容也是任意值。
var myNumbers = "seven"; //声明时赋值会默认指定类型。
var myNumbers2; //声明时可指定多个类型；
myNumbers2 = "seven" || 7;
var liu = {
    id: 897,
    name: "liu",
    age: 25,
};
//数组类型
var fibonacci = [1, 1, 2, 3, 5]; //该中不出现非数字类型。
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 类型断言，断言的变量前加上 <Type> 即可，类型断言不是类型转换。
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
jQuery('#foo');
function handleEvent(ele, event) {
    // do something
}
handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'
// 枚举类型
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
// class类  https://ts.xcatliu.com/advanced/class.html
// 使用 class 定义类，使用 constructor 定义构造函数。
// 通过 new 生成新实例的时候，会自动调用构造函数。
// 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。 
