1. 标准盒模型 IE盒模型
    标准盒模型：内容content + 填充padding + 边框border + 边界margin
    宽高：content 宽高
    IE盒模型：内容（content + padding + border） + 边界margin
    宽高：content + padding + border

    css如何设置两种模型：box-sizing：content-box     border-box

    js获取盒模型对应的宽高
    dom.style.width/height;//设置获取的是内联样式
    dom.currentStyle.width/height;//只有IE支持
    window.getComputedStyle(dom).width/height;//兼容性好
    dom.getBoundingClientRect().width/height;//适用场所：计算一个元素的绝对位置

    根据盒模型解释边距重叠

2. box-sizing默认content-box
    content-box：标准盒模型
    border-box：IE盒模型

3. BFC块级格式化上下文
    特点
    1. 内部的 Box 会在垂直方向上一个接一个放置
    2. Box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
    3. 每个元素的 margin box 的左边，与包含块 border box 的左边相接触
    4. BFC 的区域不会与 float box 重叠
    5. BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
    6. 计算 BFC 的高度时，浮动元素也会参与计算

    触发BFC
    根元素，即 html
    float 的值不为none（默认）
    overflow 的值不为 visible（默认）
    display 的值为 inline-block、table-cell、table-caption
    position 的值为 absolute 或 fixed

4. display:none 与 visibility:hidden 的区别是什么
    display : none 隐藏对应的元素，在文档布局中不再分配空间（回流+重绘）
    visibility:hideen 隐藏对应的元素，在文档布局中仍保留原来的空间（重绘）

5. position 跟 display、overflow、float 这些特性相互叠加后会怎么样
    display 属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性是一种布局
    方式，定义元素在哪个方向浮动。
    类似于优先级机制：position：absolute/fixed优先级最高，有他们在时，float不起作用，display
    值需要调整。

6. 清除浮动的方式
    父级div定义height
    最后一个浮动元素后加空 div 标签 并添加样式 clear:both。（理论上能清除任何标签，增加无意义的标签）
    包含浮动元素的父标签添加样式 overflow 为 hidden 或 auto。
    父级 div 定义 zoom（空标签元素清除浮动而不得不增加无意义代码的弊端，使用zoom:1用于兼容IE）
    用after伪元素清除浮动（用于非IE浏览器）

    .clearfix:after {
        content: "\0020";display: block;height: 0;clear: both;
    }
    .clearfix {
        zoom: 1;
    }

7. 浏览器是怎样解析CSS选择器的
    CSS选择器的解析是从右向左解析的，为了避免对所有元素进行遍历。若从左向右的匹配，发现不符合规
    则，需要进行回溯，会损失很多性能。

8. 元素竖向的百分比设定是相对于容器的高度吗
    当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属
    性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它
    们时，依据的也是父容器的宽度，而不是高度。

9. 怎么让Chrome支持小于12px 的文字
    p{
        font-size:10px;
        -webkit-transform:scale(0.8);//0.8是缩放比例
    } 

10. 动画，最小时间间隔是多久，为什么
    多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60*1000ms ＝ 16.7ms。

11. CSS 伪类和伪元素的区别
    伪类： :focus、:hover、:active
    伪元素：:before、:after

12. rgba() 和 opacity 的透明效果有什么不同
    rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的
    透明度，

　　而rgba()只作用于元素的颜色或其背景色。（设置rgba透明的元素的子元素不会继承透明效果！）

14. CSS引入的方式有哪些？使用Link和@import有什么区别
    内联，内嵌，外链，导入
    1. link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义RSS，定义 rel 连接属性等作用，无兼
       容性，支持使用javascript改变样式；而@import是CSS提供的，只能用于加载CSS，不支持使用 
       javascript 改变样式；
    2. 页面被加载的时，link 会被同时加载，而@import 引用的CSS会等到页面加载完再加载
    3. import是CSS2.1 提出的，CSS2.1以下浏览器不支持，只在IE5以上才能被识别，而link是XHTML
       标签，无兼容问题。

15. 常见的浏览器内核
    **Trident内核**：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
    **Gecko内核**：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等。
    **Presto内核**：Opera7及以上。[Opera内核原为：Presto，现为：Blink;]
    **Webkit内核**：Safari,Chrome等。[ Chrome的：Blink（WebKit的分支）]
    **EdgeHTML内核**：Microsoft Edge。[此内核其实是从MSHTML fork而来，删掉了几乎所有的IE私有特性]

16. css多列等高如何实现
    1. 父元素背景图 假象
    2. 模拟表格布局
    3. flex布局


    

    






