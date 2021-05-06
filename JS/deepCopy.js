const o = {a: 1, b: {x: 3}}
const copy1 = JSON.parse(JSON.stringify(o))
console.log(copy1);
// 对于 function、undefined，会丢失这些属性。
// 对于 RegExp、Error 对象，只会得到空对象
// 对于 date 对象，得到的结果是 string，而不是 date 对象
// 对于 NaN、Infinity、-Infinity，会变成 null
// 无法处理循环引用

function deepCopy1(obj){
    let copy = Array.isArray(obj) ? [] : {}

    for(let i in obj){
        if(obj.hasOwnProperty(i)){
            copy[i] = typeof obj[i] === 'object' && obj[i] !== null ? deepCopy1(obj[i]) : obj[i]
        }
    }

    return copy
}
  
console.log(deepCopy1(o));

// 无法解决循环引用的问题。
// var a = {b:1}
// a.c = a

function deepCopy2(obj,cache = []){
   if(obj === null || typeof obj !== 'object'){
       return obj
   }

   const hit = cache.filter(c=>c.orignial === obj)[0]
   if(hit){
       return hit.copy
   }

   const copy = Array.isArray(obj) ? [] : {}

   cache.push({
       orignial: obj, 
       copy
   })

   Object.keys(obj).forEach(key=>{
       copy[key] = deepCopy2(obj[key])
   })

   return copy
}

console.log(deepCopy2(o));
  