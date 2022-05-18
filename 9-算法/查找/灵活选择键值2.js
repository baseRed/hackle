// 447

// 给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

// 找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

// 示例:

// 输入:
// [[0,0],[1,0],[2,0]]

// 输出:
// 2

// 解释:
// 两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]

var dis = function(pa,pb){
    return (pa[0]-pb[0])*(pa[0]-pb[0]) + (pa[1]-pb[1])*(pa[1]-pb[1])
}


// 时间复杂度O(n^2)
// 空间复杂度O(n)
var numberOfBoomerangs = function(points) {
    let res = 0
    for(let i in points){
        let map = new Map()
        for(let j in points){
            
            if(i != j){
                let key = dis(points[i],points[j])
                let val = map.get(key)
                if(val){
                    map.set(key,val+1)
                }else{
                    map.set(key,1)
                }
            }
            
        }

        for(let [key,val] of map.entries()){
            res += val*(val-1)
        }
    }

    return res
};

// 练习149 