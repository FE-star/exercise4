describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //setTimeout中使用了箭头函数，在箭头函数中，this指向闭合的词法上下文，也就是obj这个函数环境
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
      //因为test是在全局上下文中运行的的，那么它的this指向全局环境，
      //因为运行环境为node，则this指向global，若在浏览器环境下，则指向window
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
            this.should.equal(global)
          }
          //对_say中的this进行了定义，但因为此时obj的内存还未生成，给_say赋值的为undefined
          return _say.bind(obj)
        }()
      }
      //执行环境为全局上下文, bind的赋值并未成功，所以此时仍指向全局的环境
      obj.say()
    })

    it('bind normal', function () {
      var obj = {} //声明并对obj赋值，所以obj内部已经有了地址，this指向obj
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(obj)
        }
        //修改_say的this指向为obj的this指向
        return _say.bind(obj)
      }()
      //当它执行，因最终执行的是_say方法，而_say中的this已被定义为obj，因为最终的this为obj
      obj.say()
    })
  })
})