var global = global;
describe('this', function () {
    it('setTimeout', function (done) {
        var obj = {
            say: function () {
                setTimeout(() => {
                    /********************************************\
                              箭头函数使用作用域上下文的this
                     \*******************************************/
                    // this 是什么？想想为什么？
                    this.should.equal(obj)
                done()
            },0)
            }
        }
        obj.say()
    })

    it('global', function () {
        function test() {
            // this 是什么？想想为什么？
            /**************************************\
                     test的执行环境是在全局作用域
             \**************************************/
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

                        /****************************************************************************\
                                 var obj 会先声明obj 此时还未进行赋值操作， 这时候this并定在global上面
                         \****************************************************************************/

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
                    /****************************************************************************\
                             var obj 会先声明obj赋值操作完成后， 这时候bind绑定在obj上面
                     \****************************************************************************/
                    this.should.equal(obj)
                }

                return _say.bind(obj)
            }()
            obj.say()
        })
    })
})