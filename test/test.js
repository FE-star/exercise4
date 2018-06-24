describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // this 指向 obj, say为 obj 调用, 所以 this 指向 obj
          // 并且 箭头函数 会在声明的时候定义 this
          // 相当于 在 setTimeout 上面会有一个 const _this = this
          // 这里的 this.should... 就相当于 _this.should
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
      // this 指向 global, 调用test的时候没有指定this,那么this就默认指向全局,
      // node 中 this 为 global, 浏览器中 this 指向 window
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
            // this 为 undefined, undefined即默认指向global
            // 因为自执行函数在声明后会自动执行,
            // 这时的 obj 还未赋值
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
          // this 为 obj, 因为 obj 先于 _say 定义,
          // 所以这里的 obj = {}
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})