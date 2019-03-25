describe('this', function () {

  // say被obj调用，此时函数say的 this 是obj,
  // 在箭头函数中的this 将与 say 的 this 保持一致. 即为 obj

  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          this.should.equal(obj);
          done()
        }, 0)
      }
    };
    obj.say()
  });

  // 在函数内部，this的值取决于函数被调用的方式
  // 全局调用函数，肯定指向全局，这里nodejs的全局是global
  // 如果是浏览器的话，那么应该指向的是window(严格模式下是undefined)

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global)
    }

    test()
  });

  describe('bind', function () {

    // obj声明提前，obj还是undefined,又因为obj中的say函数自执行（小括号）
    // 然而这里返回的函数中bind(obj)，绑定了undefine，如果传入的是undefine,那么相当于不传，即指向全局global

    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }

          return _say.bind(obj)
        }()
      };
      obj.say()
    });

    // 和上面的例子不一样，创建了一个空对象,则当obj中的say函数自执行（小括号）,bind(obj)则是绑定了obj
    it('bind normal', function () {
      var obj = {};
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(obj)
        }

        return _say.bind(obj)
      }();
      obj.say();
    });

  });
});