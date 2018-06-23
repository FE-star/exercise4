var should = require('should');
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //遵循隐式绑定规则：调用位置的上下文对象是obj，因为调用 say() 时 this 被绑定到它的上下文对象obj上
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test () {
      // this 是什么？想想为什么？
      //遵循默认绑定规则：在非严格模式下 test()是直接使用不带任何修饰的函数引用进行调，因此 this 指向全局对象。
      this.should.equal(global)
    }

    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say () {
            // this 是什么？想想为什么？
            // say立即执行后 obj处于声明未赋值的状态，_say.bind(obj) 等于  _say.bind(undefined)
            // undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值 在调用时会被忽略，实际应用的是默认绑定规则
            // this 指向指向全局变量

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
        function _say () {
          // this 是什么？想想为什么？
          // 遵循硬绑定规则：_say.bind(obj) 将this 绑定到 obj，在执行绑定之前 obj已经完成初始化
          this.should.equal(obj)
        }

        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})