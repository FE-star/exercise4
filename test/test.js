describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 由于是在obj对象上调用的函数，调用位置会使用obj上下文来引用function
          // 而箭头函数会绑定当前函数的上下文
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
      // 此时使用的时默认绑定在非严格模式下为全局对象
      // node中的全局对象为global
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
            // say引用的是立即执行函数的返回值
            // 在执行函数时 obj对象还没有被赋值 所以obj为undefined
            // bind undefined 时在非严格模式下为全局对象
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
          // 立即执行函数执行时obj已经定义 正常将obj对象作为_say的上下文
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})