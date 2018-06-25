describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // setTimeout所在的上下文即，say方法的的上下文环境也就是 obj
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
      // 这里的this指向的是test方法所在的环境上下文：如果浏览器环境中则指向的是window; node中则为global
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
            // say是一个自执行方法，return _say.bind(obj)时 obj创建还未完成，实际上传进去的是undefined，所以会被替换为全局对象
            this.should.equal(global)
          }
          return _say.bind(obj);
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // say是一个自执行方法，return _say.bind(obj)的，传入的obj对象。上下文转换为obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})