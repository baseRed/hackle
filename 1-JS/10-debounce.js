// function debounce(func,wait = 50){
//     let timmer = 0

//     return function(...args){
//         if(timmer){
//             clearTimeout(timmer)
//         }
//         timmer = setTimeout(() => {

//             func.apply(this,args)
//         }, wait);
//     }
// }

function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                result = func.apply(context, args)
            }, wait);
        }

        return result;
    }
}


let count = 0
function f(e) {
    console.log(e.clientX);
    count++

}

var fun = debounce(f, 1000, true)

let body = document.body
body.addEventListener('mousemove',(e)=>{
    fun(e)
})