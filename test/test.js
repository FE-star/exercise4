describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？ this指向obj,因为箭头函数函数
          this.should.equal(obj);
          done()
        }, 0)
      }
    };
    obj.say()
  }) ;

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？

      this.should.equal(this, global);//没有明确指明时，this指向global
    }
    test()
  });

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
              this.should.equal(this,global)
            // this.should.equal(null)//断言之前还没有执行return方法,所以这里指向的是global
          }
          return _say.bind(obj)
        }()
      };
      obj.say()
    });

    it('bind normal', function () {
      var obj = {};
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(this,obj)//因为运行的时候已经声明是指向obj
        }
        return _say.bind(obj)
      }();
      obj.say()
    })
  })
});
