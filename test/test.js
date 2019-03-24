// 测试套件
describe('this', function () {
    it('setTimeout', function (done) {
        var obj = {
            say: function () {
                setTimeout(() => {
                    // this 是什么？想想为什么？
                    // this.should.equal(null)
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
            // this.should.equal(null)
            // 非严格模式下, 在node 中 this指向 global 全局对象
            // console.log(global);
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
                        this.should.equal(global)
                    }
                    // 函数立即执行
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
