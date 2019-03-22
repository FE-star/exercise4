describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
					// 箭头函数由于没有自己的this，所以内部的this就是外层代码块的this，因此这块的this指向最外一层的作用域环境
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
			// this指向为调用它的对象,test()为全局调用函数，如果是nodejs那么全局是global，浏览器在严格模式下为undefined
			this.should.equal(undefined)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
						// bind改变this的指向为obj但是obj声明了没有赋值，所以this的指向为undefined         
            this.should.equal(undefined)
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
					// bind修改了this的指向为obj       
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})