describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          //  this 是什么？想想为什么？global
          //  箭头函数this是指向当前函数的作用域
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？global
      this.should.equal(global)
    }
    //  在node全局调用了，所以this指向global。浏览器则是window
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 因为obj尚在声明，而obj还没有声明结束就使用。所以是undefined
            this.should.equal(undefined)
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
          // 而且obj已经赋值为一个对象了
          // 这里返回了一个bind函数，绑定了obj，所以this指向了obj 
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})