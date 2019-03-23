describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是obj,obj.say()通过obj找到say(),所以是在obj环境执行,this 就是obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // this是global, 因为test()在全局环境执行
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是undefined
            //根据函数优先原则:say和_say 函数声明都提升了，然后才提升obj。在say函数中调用obj时，obj还没有初始化
            this.should.equal(undefined)
          }
          return _say.bind(obj)//将_say的this绑定到obj
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是obj
          //_say是函数声明被提升了,say函数表达式没有被提升。这时obj已经被创建并初始化了。将_say的this绑定到obj
          this.should.equal(obj)
        }
        return _say.bind(obj)//将_say的this绑定到obj
      }()
      obj.say()
    })
  })
})