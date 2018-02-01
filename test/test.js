describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          /** 
           * 箭头函数不会创建自己的this；它使用封闭执行上下文的this值
           * 传递给setTimeout的函数内的this与封闭函数中的this值相同
           * this指向函数执行时的当前对象
          */
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
      /**
       * 当没有明确的执行时的当前对象时，this指向全局对象window。
       * node环境中为全局变量（the global object）
       */
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
            /**
             * 函数bind时，obj只是声明了还未完成赋值，相当于bind(undefined)
             */
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
          /**
           * 函数bind时，obj已完成声明以及赋值，所以绑定this成功
           */
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})