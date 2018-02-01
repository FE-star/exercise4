describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数,没有this，this指向封闭上下文的this
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
      /**
       * 非严格模式，this默认为全局对象，node环境为global，浏览器为window
       * 严格模式（use strict）,未被执行，undefined
       */
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
            // 永久绑定第一个参数bind,this被设置为被创建的时的上下文，即全局
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
          // 被调用
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
