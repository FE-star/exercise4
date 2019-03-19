describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 箭头函数跟函数的调用位置无关，this的指向是最靠近的父函数的作用域，即是say函数的调用对象
          this.should.equal(obj);
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // 全局调用
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // 在定义函数的时候立即执行函数，虽然使用bind绑定obj对象，但是此时obj还未创建完毕，undefined
              // bind在绑定的对象为undefined的时候，默认是绑定全局对象，此时执行的为node环境，所以为global
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
