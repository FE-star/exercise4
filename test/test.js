describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          /*本身setTimeout如果不制定作用域的话，
          内部应该是指向全局的，但是setTimeout在声明函数
          时使用了=>箭头函数，由于箭头函数不绑定this，
          而是与声明时所在的父作用域。所以这里指向的就是obj本身*/
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
      /*全局调用函数，肯定指向全局，这里nodejs的全局是global，如果是浏览器的话，那么应该指向的是window(严格模式下是undefined)*/
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
            /* func.bind(context)函数会修改函数内部的this指向为context，使得函数不论在何时调用，
             其内部都指向context，但是这里给obj的属性say赋值时，
              obj还没有完全创建完毕，没有分配相应的地址，所以在内部调用obj的时候
             还是undefined，而bind函数如果传递undefined相当于不传，指向全局global*/
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
          /*这里就很简洁了，先创建了一个空的obj对象。然后调用bind函数传入，所以调用时指向obj*/
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})