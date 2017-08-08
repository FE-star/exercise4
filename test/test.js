describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数绑定了obj
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
      // 函数声明this绑定全局的global对象
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        // say函数后边多了一个调用 这种情况下 say相当于函数声明
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }
          // 在这里obj由于刚被创建后初始化为undefined 还没有赋值
          // 所以绑定失败 自动找到外层兜底的global
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
        // 与上一种情况不同 此时obj已经完成赋值 所以绑定成功
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})