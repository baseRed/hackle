// 350

// 给定两个数组，编写一个函数来计算它们的交集。

//  

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2,2]
// 示例 2:

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[4,9]

var intersect = function(nums1, nums2) {
    let map = new Map()
    let arr1,arr2
    if(nums1.length > nums2.length){
        arr1 = nums1
        arr2 = nums2
    }else{
        arr1 = nums2
        arr2 = nums1
    }

    for(let i in arr1){
        let key = arr1[i]
        let value = map.get(key)
        if(map.has(key)){
            map.set(key,value + 1)
        }else{
            map.set(key , 1)
        }
    }

    

    let result = []

    for(let i in arr2){
        if(map.has(arr2[i])){
            result.push(arr2[i])
            map.set(arr2[i],map.get(arr2[i]) - 1)
        }
    }

    return result
    // 两个map
};

console.log(intersect([1,2,2,1],[2,2]));

