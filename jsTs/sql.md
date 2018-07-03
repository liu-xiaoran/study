## where子句操作符
```
= 等于，<> 不等于，!= 不等于 < .... between and 介于，is null 为NULL
```
```
AND操作符 添加附加条件优先级高于 OR 可使用圆括号进行分组 in后跟括号 ```
## like操作符
```
通配符%，表示 任何字符出现任意次数
where prod_name like'Fish%' 以Fish开头的；
_ 下划线通配符，针对单个字符
```
## 函数
```
提取字符串的组成部分 substring()
数据类型转换 convert()
取当前日期 curdate()
大写 upper()
小写 lower()
匹配类似的 soundex()
字符串左边字符 left()
字符串右边字符 right()
字符串长度 length()
去掉左边空格 ltrim()
去掉右边空格 rtrim()
```
```
mysql提取日期的函数：
year() 从日期中提取年份
```
## 聚集函数
```
某列平均值 avg()
某列行数 count()
某列的最大值 max()
某列最小值 min()
某列值之和 sum()
```
## 分组
```
group by 创建分组
WHERE在数据分组前进行过滤，HAVING在数据分组后进行过滤
```