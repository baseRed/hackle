HTTPS协议：超文本传输安全协议

HTTPS经右HTTP进行通信，但利用SSL/TLS来加密数据包

HTTPS开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性

HTTPS原理
    1. 客户端向服务端索要并验证公钥。这一阶段使用的是非对称加密传输（RSA）,服务端将数字证书发给客户端，其中数字证书
       包括：公钥和数字签名，客户端在拿到后对两则进行校验
    2. 在非对称加密传输中，两端协商生成“对话秘钥”  
    3. 双方采用“对话秘钥”进行对称加密通信  

对称加密： 加密解密使用同一秘钥

非对称加密（RSA）： 双方协商一对秘钥，一个公钥一个私钥，私钥加密的数据只有对应的公钥解密
                   公钥加密的数据只有斯奥解密
                   将公钥发送给对方，对方用公钥加密，再用私钥解密

非对称加密缺点： RSA算法很慢  

所以使用非对称秘钥+对称秘钥结合的方式

非对称秘钥+对称秘钥：对称秘钥速度快，非对称秘钥使得传输的内容不能被破解，结合两则的优点，使用RSA方法将加密算法的对称秘钥
                   发送过去，之后就可以使用这个秘钥，利用对称秘钥来通信（对方如何解密对称秘钥）

中间人攻击：使用非对称加密的时候，首先需要将公钥发送给对方，这个过程中，安全没有保障，可能被拦截篡改

确认身份--数字证书： 以上步骤都是可行的，只需最后一点，确定给对方的公钥确实是对的公钥，而不是被篡改的
                   这个时候就需要公证处的存在了，也就是说先将公钥到公证处公证以下，然后将公钥传输过去，对方收到后将公钥
                   同公证处的比对确认是否正确（数字签名）

HTTP和HTTPS的区别： 
                 1. HTTP是明文传输的，HTTPS通过SSL\TLS进行加密
                 2. HTTP的端口号是80，HTTPS是443
                 3. HTTPS需要到CA申请证书，免费证书很少，需要交费
                 4. HTTP的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议
                    比HTTP协议安全

HTTPS缺点： 
            1. 握手阶段费时，页面加载时间变长，增加耗电
            2. 缓存不如HTTP高效
            3. 服务器资源占用高很多，网站投入成本加大
            4. 证书需交费

HTTPS接入优化：
                1. CDN接入
                2. 会话缓存
                3. 硬件加速
                4. 远程解密
                5. SPDY/HTTP2

                
         
                   


