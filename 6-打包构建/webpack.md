1. webpack常见
    前端为何进行打包构建
    代码层面
    体积更小（Tree-Shaking，压缩，合并），加载更快
    编译高级语言或语法（TS，ES6+，模块化，SCSS）开发环境可以使用
    兼容性和错误检查（Polyfill、postcss、eslint）

    研发流程层面
    统一高效的开发环境
    统一的构建流程和产出标准
    集成公司构建规范


    loader和plugin的区别
    loader：模块转换器（编译代码）
    plugin：扩展插件


    bable和webpack的区别
    bable JS新语法编译工具，不关心模块化
    webpack 打包构建工具，多个loader、plugin的集合


    如何产出一个lib
    参考webpack.dll.js
    output: {
        filename: 'lodash.js',
        path: distPath,
        library: 'lodash',//lib的全局变量名
    }


    bable-polyfill 和 babel-runtime

    bable-polyfill
    原理是当运行环境中并没有实现的一些方法，babel-polyfill 会给其做兼容。 但是这样做也有一个缺点，
    就是会污染全局变量，而且项目打包以后体积会增大很多，因为把整个依赖包也搭了进去。所以并不推荐在
    一些方法类库中去使用。
    1. `npm install --save babel-polyfill`
    2. 在应用的入口引用，以确保它能够最先加载：
    `import "babel-polyfill";` 或者
    `require("babel-polyfill");`

    bable-runtime
    为了不污染全局对象和内置的对象原型，但是又想体验使用新鲜语法的快感。就可以配合使用
    babel-runtime和babel-plugin-transform-runtime。
    比如当前运行环境不支持promise，可以通过引入babel-runtime/core-js/promise来获取promise，
    或者通过babel-plugin-transform-runtime自动重写你的promise。也许有人会奇怪，为什么会有两
    个runtime插件，其实是有历史原因的：刚开始开始只有babel-runtime插件，但是用起来很不方便，
    在代码中直接引入helper 函数，意味着不能共享，造成最终打包出来的文件里有很多重复的helper代
    码。所以，Babel又开发了babel-plugin-transform-runtime，这个模块会将我们的代码重写，如
    将Promise重写成_Promise（只是打比方），然后引入_Promise helper函数。这样就避免了重复打
    包代码和手动引入模块的痛苦

    1. `npm install --save-dev babel-plugin-transform-runtime`
    2. `npm install --save babel-runtime`
    3. 写入 `.babelrc`
    或者
    {
        "plugins": ["transform-runtime"]
    }


    webpack如何实现懒加载
    import（）
    结合Vue，React异步组件
    vue const Component = ()=>import('../component')
    vue3 component = defineAsyncComponent(()=>import('./components/AsyncComponent.vue'))
    react const component = React.lazy(()=>import('./component'))
    结合Vue-Route，React-Route

    Proxy为什么不能Polyfill
    Class可以用function模拟
    Promise可以用callback模拟
    Proxy功能用Object.defineProperty无法模拟，没有现成的语法可以模拟
      






2. webpack基本配置
    拆分配置和merge
    启动本地服务
    处理ES6
    处理样式
    处理图片
    模块化



    抽离压缩css
    抽离
    mini-css-extract-plugin MIniCssExtractPlugin.loader
    plugin: {
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    }

    压缩
    terser-webpack-plugin optimize-css-assets-webpack-plugin
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ]
    }

    抽离公共代码和第三方代码
    optimization: {
        splitChunks: {
            chunks: 'all',  //inital入口chunk，对于异步导入的文件不处理
                            //async异步chunk，只处理异步导入的文件
                            //all,全部chunk
            cacheGroups: {
                //第三方模块
                vender: {
                    name: 'vender', //chunk名称
                    priority: 1,//权限更高，优先抽离
                    test: /node_modules/,
                    minSize: 0, //大小限制
                    minChunks: 1, //最小复用次数
                }，
                //公共模块
                common: {
                    name: 'common',
                    priority: 0,
                    minSize: 0,
                    minChunks: 2,
                }
            }
        }
    }

    多入口-生成index.html文件
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // chunks 表示该页面引用哪些chunk
        chunks: ['index','vender','common'], //要考虑代码分割
    })
    多入口生成other.html
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other', 'common']
    })


    webpack异步加载js
    setTimeout(()=>{
        import('./dynamic-data.js').then(res=>{
            console.log(res.default.message)
        })
    },1000)


    module chunk bundle的区别
    module 各个源代码文件，webpack中提挈皆模块
    chunk 多个模块合并生成的，如 entry  import() splitChunk 
    bundle 最终的输出文件


3. 性能优化
    优化打包构建速度
    优化产出代码
    优化bable-loader
    IgnorePlugin
    noParse
    happyPack
    ParallelUglifyPlugin
    自动刷新
    热更新
    DLLPlugin

    1. 优化bable-loader
        {
            test: /\.js$/,
            use: ['bable-loader?cacheDirectory'],//开启缓存
            include: path.resolve(__dirname,'src'),//明确范围
            // include和exclude 两者选一即可
            //exclude: path.resolve(__dirname,'node_moduled')
        }
        开启缓存，未更新的代码使用缓存不再编译
        module：{
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'bable-loader',
                        options: {
                            presets: ['@bable/preset-env'],
                            plugins: ['@bable/plugin-proposal-object-rest-spread']
                        }
                    }
                }
            ]
        }

    2. IgnorePlugin
        该插件能够使得指定目录被忽略，从而使打包变快，文件变小
        let Webpack = require('webpack');
        plugins:[
            new Webpack.IgnorePlugin(/\.\/locale/,/moment/),//moment这个库中，如果引用了./locale/目录	 的内容，就忽略掉，不会打包进去
        ]
        虽然按照上面的方法忽略了包含’./locale/'该字段路径的文件目录,但是也使得我们使用的时候不能显示中文语言了，所以这个时候可以手动引入中文语言的目录
        import moment from 'moment'

        //设置语言

        //手动引入所需要的语言包
        import 'moment/locale/zh-cn';

        moment.locale('zh-cn');

        let r = moment().endOf('day').fromNow();
        console.log(r);

    3. noParse
        这是module中的一个属性，
        作用：不去解析属性值代表的库的依赖
        
        一般引用jquery，可以如下引用：
        import jq from 'jquery'
        
        对于上面的解析规则：
        当解析jq的时候，会去解析jq这个库是否有依赖其他的包
        
        对类似jq这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。所以，对于这类不引用其他的包的库，在打包的时候就没有必要去解析，这样能够增加打包速率。
        所以，可以在webpack的配置中增加noParse属性（以下代码只需要看module的noParse属性）
        
        module:{
                noParse:/jquery/,//不去解析jquery中的依赖库
                rules:[
                    {
                        test:/\.js$/,
                        use:{
                            loader:'babel-loader',
                            options:{
                                presets:[
                                    '@babel/preset-env',
                                    '@babel/preset-react'
                                ]
                            }
                        }
                    }
                ]
        }

    4. happyPack多进程打包
        JS单线程，开启多进程打包
        提高构建速度（特别是多核CPU）
        const HappyPack = require('happypack');
        module: {
            relus: [
                {
                    test: /\.js$/,
                    //把对.js文件的处理交给 id 为 bable的HappyPack实例
                    use: ['happypack/loader?id=bable'],
                    include: srcPath,
                    exclude: /node_modules/
                }
            ]
        }

        new HappyPack({
            //用唯一标识id来代表当前的HappyPack
            id: 'babel',
            //如何处理.js文件，用法和loader配置中一样
            loader: ['bable-loader?cacheDirectory']
        })

    5. ParalleUglifyPlugin多进程压缩JS
        webpack内置Uglify工具压缩JS
        JS单线程，开启多进程压缩更快
        和happyPack同理
        const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

        new ParallelUglifyPlugin({
            //传递给Uglify的参数
            //还是使用Uglify压缩。只是帮助开启了多进程
            uglifyJS： {
                output: {
                    beautity: false, //最紧凑输出
                    comment： false，//删除所有的注释
                }，
                compress: {
                    //删除所有’console‘语句
                    drop_console: true,
                    //内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    //提取出出现多次但是没有定义常量去引用的静态值
                    reduce_vars: true,
                }
            }
        })

        项目较大，打包慢，开启多进程能提高速度
        项目较小，打包很快，开启多进程会降低速度（进程开销）
        按需使用

    6. 自动刷新
        module.export = {
            watch: true, //开启监听，默认为fasle
            // 开启监听之后，webpack-dev-server会自动开启刷新浏览器

            //监听配置
            watchOptions: {
                ignored: /node_modules/, //忽略哪些
                //监听到变化发生后等300ms再去执行动作，防止文件更新太快导致重新编译频路太高
                aggregateTimeout: 300, //默认300ms
                //判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
                poll: 1000, // 默认1000ms询问一次
            }
        }

        上面方式不常用
        devServer默认会开启watch
        devServer: {
            port: 8080,
            progress: true, //显示打包进度条
            contentBase: dishPath, //根目录
            open: true, //自动打开浏览器
            compress: true, //启动 gzip 压缩
            hot: true,
            //设置代理
            proxy: {
                '/api': 'http://localhost:3000'
            }
        }

    7. 热更新
        自动刷新：整个网页全部刷新，速度较慢
        自动刷新： 整个页面全部刷新，状态会丢失
        热更新： 新代码生效，网页不刷新，状态不丢失
        1、
        devServer: {
                contentBase: './bundle',
                open: true,
                port: 8081,
                hot: true,
                // hotOnly: true
            },
        在webpack的配置文件webpack.config.js的devServer节点中，新增hot配置选项；
        
        2、
        const webpack = require('webpack');
        plugins: [new HtmlWebpackPlugin({
                    template: './src/index.html'
                }), 
                new CleanWebpackPlugin(),
                new webpack.HotModuleReplacementPlugin()//使用HotModuleReplacementPlugin插件
            ],
        同时，在webpack的插件中启用HotModuleReplacementPlugin()插件；这个插件是webpack自带的；
        3、注意事项：
        不能在使用HotModuleReplacementPlugin插件的同时开启hotOnly；
        
        
        
        + if (module.hot) {
        +   module.hot.accept('./print.js', function() {
        +     console.log('Accepting the updated printMe module!');
        +     printMe();
        +   })
        + }
        原理：这段代码的意思是：判断项目中是否启用了module.hot模块，如果启用了，就执行if语句中
        的代码；
        
        module.hot.accept('文件名字',function (){
        ));
        这个函数接收两个参数，第一个是文件的名字，第二个是回调函数，也就是当监听的文件发生变化时，
        就执行回调函数；我们可以在回调函数中做一些处理；
        这就是HMR实现的原理，由于webpack中的样式处理模块（css-loader、less-loader）已经帮我们
        实现了底层处理，因此只要我们开启了HMR就能够实现CSS的自动更新，但是JS的loader并没有实现，
        因此需要我们手动去实现

    7. DLLPlugin 动态链接库插件
        前端框架如 Vue、React，体积大，构建慢
        较稳定，不常升级版本
        同一个版本只构建一次即可，不用每次都重新构建
        
        webpack已内置DLLPlugin支持
        DLLPlugin-打包出dll文件
        DLLReferencePlugin-使用dll文件
        
        单独配置webpack.dll.js

        dll 配置将会被移除，因为 Webpack 4 的打包性能足够好的，dll 没有在 Vue ClI 里继续维护的
        必要了。

        同样的，在这个 PR 里 create-react-app 里也给出了类似的解释：webpack 4 有着比 dll 更好
        的打包性能。

        替代方案
        hard-source-webpack-plugin
        HardSourceWebpackPlugin是webpack的插件，为模块提供中间缓存步骤

        const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
        new HardSourceWebpackPlugin({
            // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如 
            // 果清除了node_modules，则缓存也是如此
            cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
            // Either an absolute path or relative to webpack's options.context.
            // Sets webpack's recordsPath if not already set.
            recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
            // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配 
            // 置构建不同的缓存
            configHash: function(webpackConfig) {
            // node-object-hash on npm can be used to build this.
            return require('node-object-hash')({sort: false}).hash(webpackConfig);
            },
            // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输 
            // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
            environmentHash: {
            root: process.cwd(),
            directories: [],
            files: ['package-lock.json', 'yarn.lock'],
            },
        }


总结
优化构建速度（可用于生产环境）
优化bable-loader
IgnorePlugin
noParse
HappyPack
ParalleUglifyPlugin(用于生产环境，开发环境不需要)
优化构建速度（不可用于生产环境）
自动刷新
热更新
DLLPlugin
条件允许时使用新版本node

性能优化-产出代码
体积更小
合理分包，不重复加载
速度更快，内存使用更少


小图片base64编码
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: {
        loader: 'url-loader',
        options: {
            //小于5kb的图片用 base64 格式产出
            // 否则依然使用file-loader的形式产出
            limit: 5 * 1024,
            //打包到 img 目录下
            outputPath: '/img',

            //设置图片的cdn地址（也可以统一在外面的output中）
            plubilcPath: 'http://cdn.abc.com'
        }
    }
}

bundle加hash

懒加载

提取公共代码
optimization: {
    splitChunks: {
        chunks: 'all',	//initial 入口chunk，对于异步导入的文件不处理
        //async 异步chunk，只处理异步导入的文件
        //all 全部chunk
        cacheGroups: {
            //第三方模块
            vendor: {
            name: 'vender',// chunk 名称
            priority: 1,//权限更高，优先抽离
            test: /node_modules/,
            minSize: 0,//大小限制
            minChunks: 1//最少复用次数
            },
            //公共模块
            common: {
                name: 'comon',
                priority: 0,
                minSize: 0,
                minChunks: 2
            }
        }
    }
}

IgnorePlugin （moment语言）

使用cdn加速（文件上传cdn服务器）

使用production（mode: 'production'）
自动压缩代码
Vue React等会自动删除调试代码（如开发环境的warning）
自动启用Tree-Shaking （必须用ES6 Module才能生效，commonJS不行）
ES6 Module 和 CommonJS 区别
ES6 Module 静态引入，编译时引入（输出的是值的引用，不可更改）
CommonJS动态引入，执行时引入（输出的是值得copy，可修改）
只有ES6 Module 才能静态分析，实现Tree-Shaking


Scope Hosting
多个文件生成多个函数，每个函数生成多个作用域（消耗内存）

开启
代码体积更小
创建函数作用域更少
代码可读性更好