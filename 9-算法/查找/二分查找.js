// 递归实现
// low和high代表数组的两边下标，mid代表数组的中间下标，target目标值
function binary_search(arr,target,low, high) {
    if(low === undefined){
        low = 0
    }

    if(high === undefined){
        high = arr.length
    }
    if (low > high){
        return -1;
    }
    var mid = parseInt(low + (high - low) / 2)
    if(arr[mid] == target){
        return mid;
    }else if (target < arr[mid] ){
        high = mid - 1;
        return binary_search(arr, low, high, target);
    }else if (target > arr[mid]){
        low = mid + 1;
        return binary_search(arr, low, high, target);
    }
};
var arr = [5,13,19,21,37,56,64,75,80,88,92];
var result = binary_search(arr,21);
console.log(result);


// 迭代实现

function binary_search(arr, target) {
    var low = 0, high = arr.length - 1;
    while(low <= high){
        var mid = parseInt(low + (high - low) / 2); 
        if(target === arr[mid]){
            return  mid;
        } else if (target > arr[mid]){
            low = mid + 1;
        } else{
            high = mid -1;
        }
    }
    return -1
};
var arr = [5,13,19,21,37,56,64,75,80,88,92];
var result = binary_search(arr, 21);
console.log(result);
