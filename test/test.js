describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //箭头函数中，this的封闭词法上下文的this保持一致
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()//等同于obj.say.call(obj);此时，obj.say中的this指的是obj
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global || window)
    }
    test()//等同于test.call(undefined),所以此时test函数中this指的是全局对象
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global || window)
          }
          return _say.bind(obj)//bind方法会指定_say方法内的this指向bind内的参数，虽然这里写的是obj,但是此时obj还未创建完成，所以为undefined
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
        return _say.bind(obj)//bind方法绑定_say内部的this指向obj
      }()
      obj.say()
    })
  })
})