// 349


// 给定两个数组，编写一个函数来计算它们的交集。

 

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]

var intersection = function(nums1, nums2) {
    let set = new Set(nums1)
    let resSet = new Set()

    for(let i in nums2){
        if(set.has(nums2[i])){
            resSet.add(nums2[i])
        }
    }

    return [...resSet]
};