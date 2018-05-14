//ES6的实现方式
class Polygon {
  //such as "this.foo = bar;" also set public properties
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon{
  constructor(length){
    super(length, length);
    this.name = 'Square';
  }
}

var a = new Polygon(0,1);

var b = new Square(3)

console.log(a.name);
console.log(a.width);
console.log(a.height);

console.log(b.name);
console.log(b.width);
console.log(b.height);

console.log(a.name);
console.log(a.width);
console.log(a.height);
