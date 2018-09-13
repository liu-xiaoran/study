//dart test
//    void main(){
//        print("hello,world");
//    }

void main()
{
    //可以使用var声明也可以用类型直接声明
    var str1 = "Ok?";

    String str2 = "It's ok!";

    //多行可以使用三个引号
    var str3 = '''Dart Lang
    Hello,World''';

    var name = 'Wang Wang';
    assert(name == "Wang Wang");

    print("Name: $name");

    //整型转换成16进制
    var hex = 0xDEADBEEF;

    print('整型转16进制 $hex -> 0x${hex.toRadixString(16).toUpperCase()}');

}