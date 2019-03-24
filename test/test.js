describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // answer: 隐含绑定（Implicit Binding）
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
      // answer: 默认绑定（Default Binding）
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
            // answer: 1. 立即执行函数 -> 明确绑定了obj, 此时obj已经被声明提升，但还未赋值，是undefined
            //         2. 而bind undefined，会把this绑定global
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
          // answer: 1. 立即执行函数 -> 明确绑定了obj(this指向obj的地址，此时obj为{}), 
          //         2. obj.say()执行 -> 此时obj的值被改变(值为{ say: [Function: bound _say] })
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})