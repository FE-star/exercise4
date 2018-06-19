describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数中的this是上一级的this，这种情况下，谁调用的函数，this就是谁。
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
      // 相当于是使用global.test()的方式调用。
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
            // 在对象赋值给obj之前自执行函数执行，这个时候已经过了预解释阶段，obj已经被声明，但却没有被赋值，是undefined，
            // bind方法把当前的obj放到了内存里面，同闭包的情况一样，无法修改，找不到this的都是global。
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
          // 在函数表达式赋值给obj.say之前自执行函数执行，这个时候obj已经被赋值成了{}。
          // bind之后的情况与上例相同，同样无法重新赋值传进去的obj，不过可以在外面修改obj的属性。
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})