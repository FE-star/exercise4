describe('this', function() {
  it('setTimeout', function(done) {
    var obj = {
      say: function() {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //箭头函数的this继承了外层函数say的this，say的this指向obj。
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function() {
    function test() {
      // this 是什么？想想为什么？
      // 函数单独调用时this指向全局变量
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function() {
    it('bind undefined', function() {
      var obj = {
        say: function() {
          function _say() {
            // this 是什么？想想为什么？
            // 立即执行函数前obj尚未定义？？所以绑定到了全局？
            this.should.equal(global)
          }
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function() {
      var obj = {}
      obj.say = function() {
        function _say() {
          // this 是什么？想想为什么？
          // 函数指向时obj已被声明，故this指向obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
