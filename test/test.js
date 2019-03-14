var should = require('should')
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 箭头函数的this不是在执行的时候绑定，而是定义时候绑定，就是this是继承自父执行上下文，
          // 所以这里的this等于函数say的this
          // 函数say是通过obj调用的，所以this是obj
          this.should.equal(obj)
          // this.should.equal(null)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // 函数没有被其他对象调用，属于全局调用
      // 严格模式下, this指向undefined
      // 非严格模式下，this指向全局, 在node环境是global，浏览器环境是window
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // 函数调用了bind，this绑定到bind的第一个参数obj
            // 但是由于函数调用的时候obj还未创建完毕，因此是undfined
            // 所以此时obj是undfined, 而bind函数如果传递undefined/null相当于不传，此时this指向全局对象global
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
          // bind改变了this的指向，绑定到了obj上
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})