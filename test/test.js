describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 普通函数中的this指的是 *运行时* 的上下文环境;
          // 另外，es6中，明确规定:
          // - 箭头函数不绑定自己的this、arguments、super、new.target, 或者说箭头函数会将this绑定到 *声明时* 的上下文上
          // - 并且即使调用call 或者 apply 也无法改变this的指向
          // 所以指向被调用者obj
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
      // 这里this指向全局作用域，在浏览器中是Window对象，node环境中指向global
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
            // 第一步：变量提升, var obj; 
            // 第二步：执行say这个 立即执行函数，该函数返回 `_say.bind(obj)`的时候 ,obj此时仍为undefined, 所以this 等于 global
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
          // 和上面的原理一样，这里在初始化的时候赋值额一个空对象。
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})