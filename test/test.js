describe('this', function() {
    it('setTimeout', function(done) {

        var obj = {
            say: function() {
                setTimeout(() => {
                    // this 是什么？想想为什么？
                    // 箭头函数this，是定义这个方法时的父级对象
                    this.should.equal(obj)
                    done()
                }, 0)
            }
        }
        obj.say()

    })

    it('global', function() {
        function test() {
            // this 是什么？想想为什么？
            // test没有指明具体的调用对象，浏览器环境的对象是window，nodejs环境是global
            this.should.equal(global)
        }
        test()
    })

    describe('bind', function() {
        it('bind undefined', function() {

            var obj = {
                say: function() {
                    function _say() {
                        // this 是什么？想想为什么？
                        // 立即执行函数，当声明时，便立即执行function里面代码，_say函数是没有调用对象，所以指向global
                        this.should.equal(global)
                    }
                    return _say.bind(obj)
                }()
            }

            obj.say()
        })

        it('bind normal', function() {
            var obj = {}
            obj.say = function() {
                function _say() {
                    // this 是什么？想想为什么？
                    // 这个方法可以简化成：
                    // obj.say = function() {
                    //     this.should.equal(obj)
                    // }
                    this.should.equal(obj)
                }
                return _say.bind(obj)
            }()
            obj.say()
        })
    })
})