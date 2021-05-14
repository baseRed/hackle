// 事件冒泡：事件会从最内层的元素开始发生，一直向上传播，直到document对象。
// p -> div -> body -> html -> document -> window

// 事件捕获：事件会从最外层开始发生，直到最具体的元素。
// window -> document -> html -> body -> div -> p


// addEventListener的第三个参数  默认false
// true 事件句柄在捕获阶段执行
// false 事件句柄在冒泡阶段执行  

// 事件代理

// addEventListener IE9以上才支持
// attachEvent


// 阻止事件冒泡
// 给子级加event.stopPropagation()
// $("#div1").mousedown(function(e){
//     var e=event||window.event;
//     event.stopPropagation();
// });

// 在事件处理函数中返回false
// $("#div1").mousedown(function(event){
//     var e=e||window.event;
//     return false;
// });

// return false 不仅阻止了事件往上冒泡，而且阻止了事件本身(默认事件)。event.stopPropagation()
// 则只阻止事件往上冒泡，不阻止事件本身

// event.target==event.currentTarget，让触发事件的元素等于绑定事件的元素，也可以阻止事件冒泡


// 阻止事件默认行为
// event.preventDefault()
// return false



// ************************************************************************************
// 捕获和冒泡的顺序

// 1. 在外层div注册事件，点击内层div来触发时间时，捕获事件比冒泡事件先触发（与代码顺序无关）

{/* <div id="test" class="test">
   <div id="testInner" class="test-inner"></div>
</div>

const btn = document.getElementById("test");
 
//捕获事件
btn.addEventListener("click", function(e){
    alert("capture is ok");
}, true);
 
//冒泡事件
btn.addEventListener("click", function(e){
    alert("bubble is ok");
}, false); */}


// 2. 当在触发事件的DOM元素上注册事件时，哪个先注册，哪个先执行
// const btnInner = document.getElementById("testInner");

// //冒泡事件
// btnInner.addEventListener("click", function(e){
//     alert("bubble is ok");
// }, false);
 
// //捕获事件
// btnInner.addEventListener("click", function(e){
//     alert("capture is ok");
// }, true);

// 3. 当外层div和内层div同时注册了捕获事件时，点击内层div时，外层div事件先触发
// const btn = document.getElementById("test");
// const btnInner = document.getElementById("testInner");

// btnInner.addEventListener("click", function(e){
//     alert("inner capture is ok");
// }, true);

// btn.addEventListener("click", function(e){
//     alert("outer capture is ok");
// }, true);

// 4. 当外层div和内层div都同时注册冒泡事件，点击内层div时，内层div先触发
// const btn = document.getElementById("test");
// const btnInner = document.getElementById("testInner");

// btn.addEventListener("click", function(e){
//     alert("outer bubble is ok");
// }, false);

// btnInner.addEventListener("click", function(e){
//     alert("inner bubble is ok");
// }, false);

// **********************************************************************************

// event.target和event.currentTarget区别

// target: 触发事件的元素
// currentTarget: 事件绑定的元素







