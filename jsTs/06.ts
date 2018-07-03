/**
 * Created by dell-zhangyue on 2017/7/27.
 */
let myNumber : any = 'seven';  // 声明时未赋值未指定类型也为任意值类型。
myNumber = 4;  // any类型可以任意赋值；可以调用任何属性，对它的任何操作返回的内容也是任意值。
let myNumbers = "seven" ;  //声明时赋值会默认指定类型。
let myNumbers2 : string | number ; //声明时可指定多个类型；
myNumbers2 = "seven" || 7 ; 
// 接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）
interface Person{
    readonly id: number; //只读属性，不可赋值。
    name: string;
    age?: number;    //可选的属性使用问号。
//  [propName: string]: any; //定义任意属性，确定属性和可选属性都必须是它的子属性。
}
let liu: Person = {   //约束了该形状必须与接口形状一致。多余的属性也是不允许的。
    id: 897,
    name: "liu",
    age: 25,
}
//数组类型
let fibonacci: number[] = [1, 1, 2, 3, 5]; //该中不出现非数字类型。
//使用接口来定义函数形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
// 类型断言，断言的变量前加上 <Type> 即可，类型断言不是类型转换。
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
// 声明语句，只会用于编译时的检查
declare var jQuery: (string) => any;
jQuery('#foo');
// /// <reference path="./jQuery.d.ts" />
// jQuery('#foo');
// Math.pow(10,"3"); 会报错
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'
// 枚举类型
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
// class类  https://ts.xcatliu.com/advanced/class.html
// 使用 class 定义类，使用 constructor 定义构造函数。
// 通过 new 生成新实例的时候，会自动调用构造函数。
// 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。