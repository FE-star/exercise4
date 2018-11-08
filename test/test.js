describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //使用ES6中的箭头函数，此时this会默认绑定在当前函数的词法作用于中。
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
      //默认绑定——非严格模式下，指向window——浏览器中
      //在node环境下，全局环境下，this指向global
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
            //js的赋值运算顺序永远都是从右往左的，_say.bind(obj)的时候，obj还没有创建，
              // 所以为undefined，当bind显示绑定传的为undefined，则表示this指向全局
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
            //强制绑定上了obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})