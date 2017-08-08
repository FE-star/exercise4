describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
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
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj2={};
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // console.log(this)
            this.should.equal(global)
          }
          // console.log(this) global
         // console.log(obj)//undefined
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
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})