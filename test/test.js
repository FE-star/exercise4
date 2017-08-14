describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数的this在第一次使用的使用就绑定了作用域为obj，之后就不会被修改，
          // 相当于setTimeout(()=>{}.bind(this))，在使用时就显式绑定作用域，所以不会出现默认绑定的情况
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
      //由于是在全局环境（调用环境）里使用的test函数，所以这里的this是全局环境
      //因为test前没有使用任何对象进行修饰或者绑定，所以使用默认绑定规则
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
            //使用bind显式绑定至obj对象，但是此时obj对象还没有声明等于UNdefined，
            //此刻应用默认绑定规则，所以this会变成全局对象
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
          // 因为obj已经被定义了，所以此刻绑定至obj变量
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
