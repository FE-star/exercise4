# 练习4

### 目标

> 复习一下`this`和`声明提升`。
### 笔记
- 一般情况下this对象指向调用函数的对象，全局环境中执行函数this对象指向window。
- 在call和apply函数中this指向的是指定的对象，如果指定的对象为undefined或者null，那this对象指向window，如果指定的对象为空this也是指向的window，如果指向的对象是字符串，那this指向的就是String
- 如果在箭头函数中，this对象等同于外层代码中的this
