function quickSort(arr){
    if(arr.length <= 1){
        return arr
    }
    
    const middleIndex = Math.floor(arr.length / 2)
    const middleVal = arr.splice(middleIndex,1)[0]
    const leftArr = [],rightArr=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<middleVal){
            leftArr.push(arr[i])
        }else{
            rightArr.push(arr[i])
        }
    }
    
    return quickSort(leftArr).concat(middleVal,quickSort(rightArr))
}

console.log(quickSort([5,8,2,9,6,4,8,7,0,4]))