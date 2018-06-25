describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 箭头函数的作用域指向它的父级作用域 等价于：
          // say: function() {
          //   const _this = this;
          //   setTimeout(() => {
          //     _this.should.equal(obj);
          //     done();
          //   })
          // }
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
      // this直接在全局作用域运行
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
            // say是一个立即执行函数，当执行到 return _say.bind(obj)的时候，obj还没创建完成，实际上传进去的是undefined，所以会被替换为全局对象
            // node中全局对象指向global
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
          // say是一个立即执行函数，当执行到 return _say.bind(obj)的时候，obj已经创建完成，所以传进去的就是obj对象
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
