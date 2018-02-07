require("should");
describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // this.should.equal(null)
          this.should.equal(obj)//谁调用say方法 this指的就是谁
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // console.log(this);
      this.should.equal(global)//这个this指向window,在node里指向global
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
            //这里因为绑定的obj 还在赋值中,你就直接调用obj了,这时候有obj变量但是没值,他是声明提升
            //然后在把一个对象赋值给obj,

          }
          return _say.bind(obj)//obj还在赋值中,他现在只是一个变量没值;所以是undefined;
          // bind的作用域指向undefined，相当于是未填作用域参数，所以作用域指向全局作用域
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // this.should.equal(null);
          this.should.equal(obj);
          //这里的this已经指的是obj 因为你上面声明变量的同时已经赋值了,定义他是一个对象
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})