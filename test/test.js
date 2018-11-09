describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？

          /* 
          正常情况下，this是在调用的时候确定的，应该指向obj的，但是setTimeout会改变this的指向全局window，在严格模式下指向null
          this.should.equal(window)
           */
          this.should.equal(null)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(null)
    }
    //  此函数为直接调用用的时默认绑定在非严格模式下为全局对象
    // node中的全局对象为global
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // say引用的是立即执行函数的返回值,在执行函数时 obj对象还没有被赋值 所以obj为undefined
            // bind undefined 时在非严格模式下为全局对象
            this.should.equal(null)
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
          // 立即执行函数执行时obj已经定义 正常将obj对象作为_say的上下文
          this.should.equal(null)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})