describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？ 箭头函数this指向外部环境（函数或全局环境）
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？test函数的调用位置在全局环境，所以this指向全局环境，为什么不是window呢？
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
        }()
      }      
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // 赋值表达式obj.say = _say.bind(obj) 的返回值是目标函数的引用，因此调用位置是在全局环境,而传递了this参数为obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})