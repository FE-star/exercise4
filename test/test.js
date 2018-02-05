describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          this.should.equal(obj);  //箭头函数里面的this会指向它外层最近一层this
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global);  //直接在全局环境下调用,为什么不是window？因为在node环境下
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global);  
          }
          return _say.bind(obj)   //这里obj传入之前是等于undefined的，因为obj这个对象还只被初始化了，也就是等于undefined，还没有赋值完成，所以传入undefined之后_say中的this就是global
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(obj);  //这个不知道为什么,这里的obj?
        }
        return _say.bind(obj)   // 这里obj已经被初始化了，也赋值为一个空对象了，所以传入的obj就是一个空对象，_say中的this就是obj
      }()
      obj.say()
    })
  })
})