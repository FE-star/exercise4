describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // this 为obj，因为obj是say函数的调用者，并且setTimeout使用的是箭头函数，不改变函数作用域
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
      // this是node的global对象，以为是在node环境中
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
            // this 是 undefined 因为bind修改_say函数的作用域的时候，obj声明了但还没有赋值
            // 复制表达式是从右往左执行，say的立即执行函数执行时，会给_say bind obj，但这时候obj没有值
            // 即obj = undefined，于是this只想node的全局对象global
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
          // this 是obj， 以为bind修改了_say函数的作用域
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})