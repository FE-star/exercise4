describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // 显式绑定
          // this指向的是obj，因为箭头函数的作用是绑定上下文。。在这个例子中。setTimeout的上下文是obj，
          // 所以this指向的是obj
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
      // 隐式绑定
      // this是global，根据最后调用的位置确定this的指向。在这里调用test的是全局的位置。。
      // 所以this绑定的是全局
      // 又因为这里是在node环境下运行的。node的全局是global，如果是在浏览器上运行的话，这个this就会是window
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
            // 显式绑定，
            // 这里的this是global，为什么是global呢？，明明我绑定的是obj
            // 这是因为js的赋值过程是先运行右边的，然后在赋值给左边，又因为声明提前的原因，
            // 所以在右边运行的时候obj是Undefined，也就是说绑定的时候obj刚好是Undefined，
            // 所以会是默认绑定，就绑定到了全局
            // 主要是赋值的过程中，等号左右的优先级顺序
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
          // 显式绑定，
          // 这个例子和上个例子唯一不同的是。obj先声明了。没有赋值。
          // 所以按照正常的显示绑定走，
          // this指向的是obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})