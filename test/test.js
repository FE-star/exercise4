describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 调用方式 obj.say()
          // 调用栈上的一个对象是obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // test() 直接调用，绑定到全局对象
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // var obj 声明提升
            // obj 的初始化赋值操作中，_say.bind(obj) 读取到的obj的值是undefined
            // 最终 obj.say = _say.bind(undefined)
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
          // 1. 硬绑定到了obj
          // 2. 即使没有bind， 以obj.say()方式调用，this也是指向obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})