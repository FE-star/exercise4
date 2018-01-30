describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 因为使用了箭头函数，不改变指向，this 是函数执行的当前对象 obj
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
      // console.log(this);
      // 函数环境下，执行环境的当前对象是 global(Node)/window(browser)，
      // 但是 mocha 测试环境使用的是严格模式 ('use strict')
      // 严格模式下，全局的 this 在执行环境内未定义
      this.should.equal(undefined)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 同上，函数声明的执行环境是 全局对象，严格模式下 this 未定义
            // 如果 下面不执行 bind(obj) => this.should.equal(obj) 成立
            this.should.equal(undefined)
          }
          return _say.bind(obj) // obj 未赋值完成，绑定 obj 无效，结果指向 全局
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
