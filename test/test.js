describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // this.should.equal(null)

          // this 是 obj, 箭头函数中的this是在定义函数的时候绑定，而不是在执行函数时绑定
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
      // this.should.equal(null)
      // this使用默认绑定（非严格模式），严格模式是undefined
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
            // this.should.equal(null)
            // 《你不知道的js上》书中 96 页 2.4.1 被忽略的this，
            // 如果你把null或者undefined作为this的绑定对象传如call，apply或者bind，
            // 这些值在调用时会被忽略，实际使用的是默认绑定规则
            // 显示绑定了obj，但是此时 obj 是 undefined, 所以 this 是 global（非严格模式），严格模式是undefined
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
          // this.should.equal(null)
          // this 是 obj，同上一个，因为此时的obj已存在
          this.should.equal(obj)
        }
        return _say.bind(obj)
        
      }()
      obj.say()
    })
  })
})