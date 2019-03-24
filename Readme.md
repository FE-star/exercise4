# 练习4

### 目标

> 复习一下`this`和`声明提升`。

### mocha命令行解释
* --help 或 -h  帮助
$ mocha -h
* 指定测试报告格式，默认是spec格式
mocha --reporter spec
* 桌面显示测试结果
$ mocha --growl
* 监视指定测试的脚本，自动运行mocha
$ mocha --watch
* 指定只要有一个测试用例没通过，就停止执行后面的测试用例
$ mocha --bail
* 搜索指定用例并执行
$ mocha --grep "1加1"