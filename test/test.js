describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        var ths = this
        setTimeout(() => {
          // this 是什么？想想为什么？
          // this.should.equal(null)
          // 箭头函数作用域穿透
					this.should.equal(obj)
          this.should.equal(ths)
					done()
        }, 0)
      }
    }
    // 调用方式为对象调用方法，方法内部this指向调用对象
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // this.should.equal(null)

			// node中函数作用域this指向全局global变量
			this.should.equal(global)
		}
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        // 初始化语句拆分
        // var obj
        // obj = {} //这步赋值操作的值对象的求值过程依赖的obj的值，而obj的值是undefined，所以bind了undefined
        say: function () {
          console.log('=========', obj)
          function _say() {
            // this 是什么？想想为什么？
            // this.should.equal(null)
            // 函数内部this应该是global现在显式的指定为obj
						// this.should.equal(undefined)   ?
						this.should.equal(global)
					}
          // 显式指定_say方法内部this为obj = undefined
          return _say.bind(obj)
        }() //立即执行形成闭包，返回内部函数_say
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}// obj已经指向这个对象
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          // this.should.equal(null)
					this.should.equal(obj)

				}
        return _say.bind(obj)
      }()
      obj.say()
    })
    // 添加new的this测试
		it('new operate', function () {
		  var newThis
			function Obj() {
				newThis = this
			}
      (new Obj()).should.equal(newThis)
		})
  })
})