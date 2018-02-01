describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          //箭头函数this指向外部，也就是obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      //默认this是全局对象 也就是global
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            //this为global
            //
            this.should.equal(global)
          }
          // obj为undefined ,所以this依然为global
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          this.should.equal(obj)
        }
        //bind时候obj为{}
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
