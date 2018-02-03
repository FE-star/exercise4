describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // obj，箭头函数作用域继承原作用域
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
      // global，新建函数若没有主动指定作用域，默认就是指向全局作用域
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
            // global，say函数是一个IIFE，
            // 当执行完函数时，obj还没有完成赋值
            // 但是js解析器对其进行了预定义，所以obj是undefined
            // bind的作用域指向undefined，相当于是未填作用域参数，所以作用域指向全局作用域
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
          // obj，上一题说的很清楚，这次obj是完成赋值了，所以bind可以成功将作用域指向obj。
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})