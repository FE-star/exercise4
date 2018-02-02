describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // FIXME:
          // * 默认setTimeout()、setInterval()和匿名函数执行时的当前对象是全局对象window
          // * ES6中箭头函数,this指向是根据定义时所在的对象,this是固定的不可变的
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
      // FIXME:
      // * 存粹的函数调用,属于全局性调用; node环境下的指向的是全局对像`Global`,浏览器的全局对象是`window`
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        // name: 'Junting',   测试立即执行函数的 obj 指向哪
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // FIXME:
            // * 默认作为对象方法下的函数调用,this指向是根据谁调用就指向谁
            // * obj里的say方法为立即执行函数,指向为global;最后返回一个绑定函数,是一个新的函数,跟之前的原函数没有任何关联,指定的第一个参数为 指向的对象;
            this.should.equal(global)
          }
          return _say.bind(obj) // obj 指向 undefined
        }() // global
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // FIXME:
          this.should.equal(obj) 
        }
        return _say.bind(obj) // 此时的 obj 的是根据上面定义的obj
      }()
      obj.say()
    })
  })
})