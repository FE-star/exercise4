describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 箭头函数没有自己的this, 默认指向在定义它时所处的对象, 而不是执行时的对象
          this.should.equal(obj)
          done()
        }, 0)
        setTimeout(function() {
          // setTimout指向global
          this.should.equal(global)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // this 指向调用对象
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      // 非严格模式，bind(thisArg,[]),thisArg为空时，this指向global/window
      // 严格模式，bind(thisArg,[]),thisArg为空时，会直接报错
      var obj = {
        say: function () {
          function _say() {
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
          // _say.bind(obj) 改变了_say的指向，指向了obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})