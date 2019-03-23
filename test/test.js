describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 因为obj.say()，调用了say的function，故say的this指向obj,而箭头函数setTimeout随父级的this，故this为obj;
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
      // 默认绑定，指向全局
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
            // 进入it的function中，创建function环境；找到var声明的变量，「创建」obj并「初始化」为undefined；
            // 执行立即执行的函数，并将该函数「赋值」给say；
            // 在执行函数的时候_say.bind(obj)，此时obj为初始化后的undefined；
            // bind绑定为undefined时候默认绑定全局对象，此处为node故global
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
          // 道理同上只不过obj在bind时候已经被创建，故最终绑定为obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})