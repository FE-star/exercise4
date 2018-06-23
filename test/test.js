describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 箭头函数，继承父级执行上下文的this 所以是obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // 在全局中调用，this执行全局
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            //虽然_say函数用bind改变了this指向obj，
            //但是say是立即执行函数，（函数声明优先于变量声明，变量先创建一个空的变量，在赋值）
            //在obj声明的时候say已经执行了，但是obj还没赋值所以是undefined = global
            this.should.equal(global)
          }
          console.log(obj)
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // 虽然也是立即执行函数，obj.say赋值为fun，
          // 不是函数声明，因此按照顺序obj先赋值{}，obj.say再赋值fun。bind指向到了obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})