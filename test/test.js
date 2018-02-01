describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        var that = this;
        setTimeout(() => {
          // this 是什么？想想为什么？
          this.should.equal(that)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // 放在浏览器里面this应该是window
      // 但这个只是测试，找不到window，所以是null？？
      this.should.equal(null)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(null)
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
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})
