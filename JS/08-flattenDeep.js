// const flattenDeep = (arr) => Array.isArray(arr)
//   ? arr.reduce( (a, b) => [...a, ...flattenDeep(b)] , [])
//   : [arr]

const flattenDeep = function(arr){
    let resultArr = []
    function deep(arr){
        if(Array.isArray(arr)){
            arr.forEach(item=>{
                if(Array.isArray(item)){
                    deep(item)
                }else{
                    resultArr.push(item)
                }
            })
        }else{
            resultArr.push(arr)
        }
    }
    
    deep(arr)
    return resultArr
}

// 数组项都为数字
function fn(arr){
    return arr.join().split(',').map(Number)
}

function fn1(arr){
    return arr.flat(Infinity)
}

console.log(fn1([{a:1}, [[2], [3, [4]], 5]]));
