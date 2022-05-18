function throttle(func, wait) {
    let context,args,timmer
    let pre = 0
    let later = function(){
        pre = Date.now()
        timmer = null
        func.apply(context,args)
    }

    let throttled = function(){
        let now = Date.now()
        let remain = wait - (now - pre)
        context = this
        args = arguments

        if(remain < 0 || remain > wait){
            if(timmer){
                clearTimeout(timmer)
                timmer = null
            }

            pre = now
            func.apply(context,args)
        }else if(!timmer){
            timmer = setTimeout(later,remain)
        }
    }

    return throttled

}


let count = 0
function f(e) {
    console.log(e.clientX);
    count++

}

var fun = throttle(f, 1000, true)

let body = document.body
body.addEventListener('mousemove',(e)=>{
    fun(e)
})

// https://github.com/mqyqingfeng/Blog/issues/26

// 有头无尾 || 无头有尾
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }

    
    return throttled;
}




// function throttle(fn,wait){
//     let preTime = new Date().getTime()
//     return function(){
//         let nowTime = new Date().getTime()

//         if(nowTime - preTime > wait){
//             return fn.apply(this,[...arguments])
//         }
        
//         preTime = nowTime
//     }
// }

// let count = 0

// function test(){
//     console.log(count)
//     count ++
// }

// setInterval(throttle(test,2000),1000)


