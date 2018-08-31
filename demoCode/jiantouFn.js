(
    () => {
        console.log(123);
    }
)();

(
    function fn() {
        console.log(123);
    }
)();
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// 数组迭代中更改元素组不会停下来，两种方式打出结果一致
var words = [1, 2, 34, 5, 6];
words.forEach(word => {
    console.log(word);
    if (word === 2) {
        words.push(33);
        words.shift();
        console.log(words);
    }
});
console.log('分割')
var texts = [1, 2, 34, 5, 6];
for (let i = 0; i < texts.length; i++) {
    console.log(texts[i]);
    if (texts[i] === 2) {
        texts.push(33);
        texts.shift();
        console.log(texts);
    }
}

var obj = { aa: 12, bb: 9 };
for (item in obj) {
    console.log(item);
}
// 对象没有foreach
obj.forEach((item, key) => {
    console.log(item);
    console.log(key);

})