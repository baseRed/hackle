1. http常见请求头

    Accept Accept-Chartset Accept-Encoding 
    Cache-Control
    Connection
    Cookie
    Host
    If-Match
    If-Modified-Since
    
2. http常见相应头

    Accept-Control-Allow-Origin
    Cache-Control
    Content-Encoding
    Content-Length
    Content-Langusge
    Date
    Etag
    Exprice
    Last-Modified
    Set-Cookie


3. http缓存

    强缓存

    Exprices 服务端返回的数据到期时间，再次请求时间小于返回的此时间，则直接使用缓存数据
    但客户端和服务端时间可能有差异，导致缓存命中的误差，Expires是HTTP1.0的产物，现在大多
    使用Cache-Control代替

    Cache-Control 有很多属性。
    privite: 客户端可以缓存
    public: 客户端和代理服务器都可以缓存 
    max-age=t: 缓存内容将在t秒后失效
    no-cache: 需要使用协商缓存来验证缓存数据
    no-store: 不使用缓存

    协商缓存

    Last-Modified: 服务器在相应请求时，会告诉客户端资源的最后修改时间
    If-Modified-Since: 浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间。
                       服务端收到此请求头发现有If-Modified-Since,则与被请求资源的最后修改时间进行对比，如果
                       一致则返回304和相应报文头，客户端只需从缓存中读取数据即可。字面意思就是：从某个时间点
                       算起，是否文件被修改了
                       
                       1. 如果真的被修改：开始传输相应一个整体，服务器返回：200 OK
                       2. 如果没有被修改： 只需传输响应header,服务器返回： 304 Not Modified

    If-Unmodified-Since: 字面意思即：从某个时间点算起，是否文件没有被修改

                         1. 如果没有被修改：开始‘继续’传送文件 服务器返回： 200 OK
                         2. 如果文件被修改： 不传输 服务器返回： 412 Precondition failed(预处理错误)

    两则区别是： 一个是修改了才下载一个是没修改才下载。

    Last-Modified缺点： 如果在服务器上，一个资源被修改了，但其实际内容根本没有改编，会因为Last-Modified
                        时间匹配不上而返回了整个实体给客户端（即客户端缓存里有一个一模一样的资源）。为了解决
                        这个问题，HTTP1.1推出了Etag   
                        
    Etag: 服务器相应请求时，通过该字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）

    If-None-Match: 再次请求资源时，客户端的请求报文头部会包含该字段，值为缓存中获取的标识。服务器接收到此
                   报文后发现If-None-Match则与被请求资源的唯一标识进行对比
                   
                   1. 不同： 资源被改动过，则相应整个资源内容， 200
                   2. 相同： 资源没有被修改过，则相应header，客户端从缓存中获取数据。 304
    
    Etag缺点： 实际使用中Etag的计算是使用算法来得出的，而算法会占用服务器端计算的资源，所有服务器端的资源都是宝贵的，
              所以很少使用Etag了 

    缓存的优点： 
                1. 减少了冗余的数据传递，节省宽带流量
                2. 减少了服务器的负担，大大提高网站性能
                3. 加快了哭护短加载网页的速度
              
    不同刷新的请求执行过程： 
                1. 浏览器地址栏中输入URL，回车 浏览器发现缓存中有这个文件了，不用继续请求了，直接从缓存取（最快）
                2. F5 告诉浏览器，别偷懒，好歹去服务器看看这个文件是否过期了。于是浏览器就发送了一个带IF-Modified-Since
                   的请求
                3. Ctrl + F5 告诉浏览器，先把缓存中的文件，再去服务器请求个完整的资源下来。于是客户端就完成了更新的操作


4. HTTP keep-alive
    在HTTP1.0时期，每个TCP连接只会被一个HTTP Transaction(请求加相应)使用，请求时建立，请求完成释放连接，当网页内容
    越来越复杂，包含大量图片、CSS等资源之后，这种模式效率就显得太低了。所以，在HTTP1.1中，引入了HTTP keep-alive，目的是
    复用TCP连接，在一个TCP连接上进行多次的HTTP请求从而提升性能

    HTTP1.0中默认是关闭的，需要在HTTP头加入“Connection：Keep-clive”，才能启用Keep-Alive;HTTP1.1中默认启用Keep-Alive
    加入“Connection：close”关闭

5. options预请求
    1. HTTP共有八种常见请求方法
        get: 参数在url上，浏览器长度有限制，不安全
        post: 参数不可见，长度不收限制
        put: 上传最新内容到指定位置
        delete: 删除请求的url所表示的资源
        head： 不返回响应主题，主要用于客户端查看服务器性能
        options： 与head类似，是客户端用于查看服务器的性能，JavaScript的XMLHttpRequest对象进行CORS跨域资源共享时，
        就是使用OPTIONS方法发送嗅探请求，以判断是否有对指定资源的访问权限
        connect： http1.1预留的，将连接方式改为管道方式，通常用于SSL加密服务的链接与HTTP非加密的代理服务器之间的通信

        一般来说我们只需要用到post和get，但是如果后端是ResetFul设计规范下就需要用到各种语义化的方法了
    2. 什么是预请求
        预请求就是复杂请求（可能对服务器数据产生副作用的HTTP请求方法，如put，delete都会对服务器数据进行修改，所以要先
        询问服务器）
        跨域请求中，浏览器自发的发起的预请求，浏览器会查询到两次请求，第一次的请求参数是options，以检测实际请求是否可以
        被浏览器接受

    3. 为什么需要
        w3c规范要求，对复杂请求，浏览器必须先使用options发起一个预检请求，从而获知服务器是否允许该跨域请求，服务器确认以
        后才能发起实际的HTTP请求，否则停止第二次正式请求
        为什么不常见options请求
        因为大部分使用的get，post请求属于简单请求，简单请求不会触发options请求

    4. 什么情况下发生（以下都属于复杂请求）
        请求方法不是get、head、post
        post的content-type不是application/x-www-form-urlencode，multipart/form-data，text/plain [也就是
        content-type设置成application/json]
        请求设置了自定义的header字段：比如业务需求，穿一个字段，方便后端获取，不需要每个接口都传
    5. 为什么需要设置成content-type： 'application/json'
        ajax发送复杂的json数据结构，处理方式困难，服务端难以解析，所以有了application/json这种类型，服务端好
        解析并且比较统一，如果请求中没有设置成json格式的，有的服务端收到也会改成json的，但是如何请求中就改成json格式
        的就会发生options预请求

        如果设置了
        表示json格式的字符串，发送的json对象必须使用json.stringfy进行序列化字符串才能匹配
        spring需要使用@RequestBody来注解

        如果没设置
        默认将使用content-type：'application/json' application/x-www-form-urlencoded
    6. 需要配置什么
        在CORS中，可以使用OPTIONS放大发起一个预检请求，服务器基于从预检请求获得的信息来判断，以检测实际请求
        是否可以被服务器接受

        预请求的请求报文中要设置
        Access-Control-Request-Method首部字段：告知服务器实际请求所使用的HTTP方法
        Access-Control-Request-Headers首部字段：告知服务器实际请求所携带的自定义首部字段

        同时服务器端或者nginx需要设置响应体
        Access-Control-Allow-Origin : * 【跨域】
        Access-Control-Allow-Methods:POST,GET,OPTIONS,DELEDET 【所允许的请求方法告知客户端】
        Access-Control-Allow-Headers: X-Requested-With, accept, origin, content-type【自定义的请求头】
        Access-Control-Allow-Age:3600  
        【一段时间内不需要再次预请求，直接用本次结果即可】
        "Content-Type", "application/json;charset=utf-8"
    7. options作用
        主要有两个
        获取服务器支持的HTTP请求方法；也是黑客经常使用的方法
        用来检查服务器的性能。例如：AJAX进行跨域请求时的预检，需要向另外一个域名的资源发送一个options请求，用以
        判断实际方发送的请求是否安全
    8. 跨域方法
        JSONP跨域
        CORS跨域资源共享：options请求做嗅探
        webSocket：全双工通信
        img src: 不受浏览器的同源限制        


