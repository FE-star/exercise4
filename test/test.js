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
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})