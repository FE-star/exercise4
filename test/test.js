describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 使用箭头函数，这里的this指向父级作用域，父级是一个函数作用在obj对象内，所以这里的this指向obj
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
      // test在全局环境中调用所以这里的this指向global（全局）
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
            // say是立即执行函数，执行到return时obj尚未初始化完成，所以这里的this指向global
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
          // say是立即执行函数，obj已经创建完成，_say.bind(obj)将this绑定到obj上，所以this指向obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})