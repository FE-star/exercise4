describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    // setTimeout一般指向window，但是在箭头函数中，不会创建自己的this，使用封闭执行上下文的this值
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // 浏览器环境this指向window，node环境this指向global
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
            // bind，call改变this的指向，obj由于变量提升，为undefined，_say.bind(obj) === _say.bind(undefined),
            // 在没有指明this的情况下，this在node环境global，浏览器环境指向window
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
          // 定义了obj对象并调用该对象的say方法，所以bind(obj)指向obj，this指向也就指向obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})