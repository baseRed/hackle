1. 执行上下文
    下面代码输出结果
    showName()
    console.log(myname)
    var myname = '极客时间'
    function showName() {
        console.log('函数 showName 被执行');
    }

    # 函数 showName 被执行
    # undefined

2. 变量提升
    JavaScript中的声明和赋值
    var name = 'lilei'
    可以看成
    var name
    name = 'lilei'

    函数的声明和赋值
    function foo(){
        console.log('foo')
    }
       
    var bar = function(){
        console.log('bar')
    }

    所谓的变量提升，是指在JavaScript代码执行过程中，JavaScript引擎把变量的生命不分和函数的声明部分
    提升到代码开头的‘行为’，变量提升后，会给变量设置默认值，这个默认值就是undefined

3. JavaScript代码的执行流程
    从字面意义来看，‘变量提升’意味着变量和函数的声明会在物理层面异动到代码的最前面，但，这并不正确
    实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被JavaScript引擎放入内存中。
    一段JavaScript代码在执行之前需要被JavaScript引擎编译，编译完成之后，才会进入执行阶段
    1. 编译阶段
        输入一段代码，经过编译后，会生成两部分内容：执行上下文和可执行代码
        执行上下文是JavaScript执行一段代码时的运行环境。比如调用一个函数，就会进入这个函数的执行上下文，
        确定该函数在执行期间调用到的诸如this、变量、对象以及函数等

    2. 执行阶段
        JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行

        实际上，编一阶段和执行阶段是非常复杂的，包括词法分析、语法分析、代码优化、代码生成等

    3. 代码中出现相同的变量和函数
        在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，
        这是因为后定义的会覆盖掉之前定义的

        JavaScript 的执行机制：先编译，再执行


        同名变量和函数的两点处理原则：
        如果是同名的函数，JavaScript编译阶段会选择最后声明的那个。
        如果变量和函数同名，那么在编译阶段，变量的声明会被忽略