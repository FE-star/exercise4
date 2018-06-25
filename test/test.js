describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 如果此处不使用箭头函数的形式，this应当指向的是global，因为异步执行的代码会被认为是在全局环境内执行的
          // 但此处使用了箭头函数，因为箭头函数没有this，会从自己作用域链的上一层继承this，而上一级是say()的函数作用域，作为obj的方法调用，this指向obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // test方法是个全局方法，全局方法执行是在全局作用域内，指向global（或者可以认为是global.test()）
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 可以把整个代码执行过程梳理如下：
            // 1. 变量提升 var obj
            // 2. 变量初始化
            //    当初始化say属性值时，发现为一个自执行函数，会对其执行将其返回值赋值给say属性
            //    可以看到，return的是一个_say函数，但是使用bind方法改变了函数内部的this值
            //    但是此时其实还处于初始化过程中，obj的值还是undefined，通过实参传值给bind方法
            //    所以这里say属性的值是_say.bind(undefined)
            //    可能这里还存在疑问的是，为什么不是通过引用传递，这里我个人理解为当时obj还是原始类型，值为undefined，所以是按值传递，而不是按共享传递
            // 3. 执行obj.say()，即_say.bind(undefined)()
            // 4. 因为被赋值了undefined，this会指向全局对象global
            this.should.equal(global)
          }
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // 这里和上面问题不同的是，这里obj已经初始化且是引用类型了，所以按共享传递的话，this === obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})