describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          /**
           * 这里若不使用箭头函数，普通匿名函数的话, 在此场景下，this 为 Timeout
           * ref https://nodejs.org/dist/latest-v11.x/docs/api/timers.html#timers_class_timeout
           */
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
      // test Function 在 global 场景下调用
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
          /**
           * 这里 obj 为 undefined, 所以 _say 调用时 this 为 global 相当于 _say.bind(null)
           * 至于 obj 为何为 undefined，say 属性是一个立即执行函数，不同于 _say，在定义 obj 时 say 已经被 「调用」
           * 类似
           * function say() {
           *   return _say() {}
           * }()
           * var obj = { say }
           */
          return _say.bind(obj);
        }()
      }
      obj.say()
    })

    // 若想要正确绑定 obj, 去除 bind
    it('bind ok', function () {
      var obj = {
        say: function () {
          function _say() {
            this.should.equal(obj)
          }
          return _say;
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // 此时 obj 是在 global 下有定义，obj 不为 undefined
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
