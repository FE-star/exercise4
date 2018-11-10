describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () { // quote YDKJS page 334,"Instead of using the four standard this rules, arrow-functions adopt the this binding form the enclosing (function or global) scope"
        setTimeout(() => {
          // this 是什么？想想为什么？
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
      this.should.equal(global) // 非浏览器，非strict mode环境，call-site 是全局的
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {  // assign 是从右往左执行的，先初始化object然后把这个object的地址赋值给obj变量，在第32行执行的时候，obj并不存在在内存，所以事实上_say bind于undefined上也就是默认的全局变量上
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }
	  console.log("test: " + obj); // test: undefined, 证明上述论断是正确的
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () { // 基于25行的论断，此时obj已经存于内存了，45行显式绑定成功
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
