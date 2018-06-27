describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
          // 第2步执行setTimeout
        setTimeout(() => {
          // 第3步执行setTimeout的回调函数
          // 由于回调函数是个箭头函数，没有自己的this，回调函数的this指向父作用域的this
          // 父作用域就是function内的this，由于是obj调用的，当然是obj了
          console.log();
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    // 第1步执行obj.say()
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        // 第1步obj初始化的时候，由于是say方法是自执行函数，先执行这个自执行函数
        // 执行完后，返回一个函数对象_say.bind(undefined)
        // 为什么此时obj是undefined，因为obj还没有被初始化成功
        // obj 对象完成赋值
        say: function () {
          function _say() {
            // 第4步
            // 由于_say.bind(undefined)，强制绑定了this为undefined
            // 在node中为global
            this.should.equal(global)
          }
          // 第3步执行返回的函数
          // 通过第2步，执行返回的函数_say.bind(undefined)
          // 为什么此时还是undefined，因为在obj初始化的时候，已经完成了给obj赋值（undefined）
          // 不会重新将obj赋值
          return _say.bind(obj)
        }()
      }
      // 第2步执行obj.say()
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          console.log(this)
          this.should.equal(obj) // obj应该是54申明的空对象
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})