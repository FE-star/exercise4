describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //根据调用点而不是函数声明的地方，因为调用的对象是obj，所以此处this指向调用的对象obj,而不是函数声明本身和它的词法作用域
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
      // 只是函数本身的调用，并没有任何对象指向
      this.should.equal(null)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 不太理解，这里应该也是硬绑定，为啥不是obj
            this.should.equal(undefined)
            this.should.equal(null)
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
          // 硬绑定，此时的调用点的对象是obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
