describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数的 this 由它定义的时候的上下文决定，也无法通过 call, apply 指定
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
      // 普通函数的 this 未指定的情况下（call, apply），通常由它调用时的上下文决定
      // should 最新版问题： this.should.equal(undefined)
      should.equal(this, global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 首先，bind 返回新函数，不会调用原函数，这个新函数会 call 原来的函数，call 的参数由你指定
            // 然后，_say.bind(obj) 运行时的上下文中 obj 为 undefined
            // 最后，call 第一个参数为 undefined 时，即不指定 this 值，最终会指向全局对象 global
            should.equal(this, global)
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
          // 与上面不同的是，_say.bind(obj) 运行时的上下文中 obj 为 {}，初始化赋值均已经完成
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})