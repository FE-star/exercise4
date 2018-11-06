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
    /**
     * 由于是obj调用say函数，调用者为obj，因此，在say函数里，this为obj。
     * 假如修改如下：
     *   let say2=obj.say;
     *   say2();
     * 那么此时的调用者为global，因此this为global。(如果代码是运行环境在浏览器，则为Window，因为调用者为Window)
     */
    obj.say()
  })

  it('setTimeout2', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          this.should.equal(global)
          done()
        }, 0)
      }
    }
    let say2 = obj.say;
    /**
     * 此时say2的调用者为global，因此this指向global
     */
    say2();
  })

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global)
    }
    /**
     * 由于test()的调用者为global，因此this为global。
     */
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
          /**
          * bind的作用是绑定this的值，这里的作用是绑定_say里的this指向obj，
          * 但是由于此时obj还未初始化，因此obj为undefined，
          * 因此这里相当于_say.bind(undefined),
          * 因此this指向_say执行的作用域global（此时_say立即执行函数的作用域为global）。
          */
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
          this.should.equal(obj)
        }
        /**
         * 此时obj已经定义，因此bind将_say里的this指向obj
         */
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})