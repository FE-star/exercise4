describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数内的this指向封闭该箭头函数的环境对象, 这里的环境对象为obj
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
      // this指向所在环境的全局作用域
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
          return _say.bind(obj)
          // obj还未定义完就立即函数执行时, 此时obj为undefined, bind(undefined) === bind(), 等价于未硬绑定, this指向所在环境的全局作用域
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
        // obj已经被定义并赋值, _say被硬绑定到obj
      }()
      obj.say()
    })
  })
})