describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        // 箭头函数将this绑定为当前执行环境，当前执行上下文为obj
        setTimeout(() => {
          // this 是什么？想想为什么?
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
      this.should.equal(global)
    }
    // 当前函数的执行环境在全局作用域中，所以this指向的是global
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 由于赋值操作是从右向左进行，所以bind操作时obj并未声明，
            // 所以为undefined，此时将全局作用域传入执行环境参数中
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
          // 普通的bind操作，当前函数的执行上下文为绑定的对象
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})