function mergeSort(arr){
    if(arr.length < 2){
        return arr
    }
    const len = arr.length
    const mid = Math.floor(len/2)
    const leftArr = arr.slice(0,mid)
    const rightArr = arr.slice(mid)
    
    return mergeArr(mergeSort(leftArr),mergeSort(rightArr))
}

function mergeArr(left,right){
    const result = []
    
    while(left.length && right.length){
        if(left[0] <= right[0]){
            result.push(left.shift())
        }else{
            result.push(right.shift())
        }
    }
    
    while(left.length){
        result.push(left.shift())
    }
    
    while(right.length){
        result.push(right.shift())
    }
    
    return result
}

console.log(mergeSort([5,8,2,9,6,4,8,7,0,4]))