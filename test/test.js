/* eslint-env mocha */
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          this.should.equal(obj)
          // this 是一个完全根据调用点（函数是如何被调用的）而为每次函数调用建立的绑定
          done()
        }, 0)
      }
    }
    obj.say()
    // obj.say.call(obj)
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(undefined)
      // this 是一个完全根据调用点（函数是如何被调用的）而为每次函数调用建立的绑定
      // 在全局中调用，全局对象node中是global，在浏览器中是Window
    }
    test()
     //test.call(undefined)
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(undefined)
            // 全局对象node中是global，在浏览器中是Window
            // 用bind方法来设置函数的this值，但是say是一个obj内部的立即执行函数，绑定时obj还是undefined
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
          // 用bind方法来设置函数的this值，而不用考虑函数如何被调用的
          // 和上一个例子一样也是一个立即执行函数，但是obj一开始被创建出来了，所以绑定到了obj
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})