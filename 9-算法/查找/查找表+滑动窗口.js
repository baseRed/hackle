// 219

// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。

//  

// 示例 1:

// 输入: nums = [1,2,3,1], k = 3
// 输出: true
// 示例 2:

// 输入: nums = [1,0,1,1], k = 1
// 输出: true
// 示例 3:

// 输入: nums = [1,2,3,1,2,3], k = 2
// 输出: false


// 方法一：暴力解法，双重for循环

// 时间复杂度O(n)
// 空间复杂度O(k)
var containsNearbyDuplicate = function(nums, k) {
    let map = new Map()

    for(let i in nums){
        if(map.get(nums[i])){
            return true
        }

        map.set(nums[i],i)

        if(map.size === k+1){
            map.delete(nums[i-k])
        }
    }

    return false
};

// 217