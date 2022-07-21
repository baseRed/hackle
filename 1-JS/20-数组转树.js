// 请将以下队列转换为树, 其中parentId表示每个点所属的父节点, 子节点的key请使用children表示

const data = [
    {"id":1,"parentId":0,"name":"上海市"},
    {"id":2,"parentId":1,"name":"杨浦区"},
    {"id":3,"parentId":1,"name":"静安区"},
    {"id":4,"parentId":2,"name":"营口路"},
    {"id":5,"parentId":3,"name":"北京西路"},
    {"id":6,"parentId":2,"name":"长海路"},
    {"id":7,"parentId":3,"name":"长寿路"},
    {"id":8,"parentId":4,"name":"1号楼"},
    {"id":9,"parentId":4,"name":"2号楼"}
]

// [
//     {"id":1,"parentId":0,"name":"上海市","children":
//         [
//             {"id":2,"parentId":1,"name":"杨浦区","children":
//                 [
//                     {"id":4,"parentId":2,"name":"黄兴路","children":
//                         [
//                             {"id":8,"parentId":4,"name":"1号楼","children":[]},
//                             {"id":9,"parentId":4,"name":"2号楼","children":[]}
//                         ]
//                     },
//                     {"id":6,"parentId":2,"name":"西藏北路","children":[]}
//                 ]
//             },
//             {"id":3,"parentId":1,"name":"静安区","children":
//                 [
//                     {"id":5,"parentId":3,"name":"延吉中路","children":[]},
//                     {"id":7,"parentId":3,"name":"南京路","children":[]}
//                 ]
//             }
//         ]
//     }
// ]

function arrToTree(data) {
    // 创建一个空数组
    let result = []
         if (!Array.isArray(data)) {
           // 首先判断传进来的这个参数是不是一个数组
           return result
           // 如果不是直接结束
         }
         data.forEach(item => {
           // 首次循环遍历每一项 判断每一项里面是否有子节点
           delete item.children;
           // 如果有就是不符合条件就删除
         });
         // 创建一个空对象
         let map = {};
         data.forEach(item => {
           // 然后再次遍历数组中的每一项，让每一项的ID值作为map对象的键
           map[item.id] = item;
         });
         data.forEach(item => {
           // 找到item的上一级
           let parent = map[item.parentId];
           if (parent) {
             // 判断当前parent有没有children属性有的话就把item加进去，没有就先初始化再加进去
             (parent.children || (parent.children = [])).push(item);
           } else {
             // 如果他没有父亲就把他加入到我们首次声明的数组里
             result.push(item);
           }
         });

         return result;
   }

   function arrTransTree(data){
        let result = []
        if(!Array.isArray(data) || data.length === 0){
            return result
        }

        let map = {}

        data.forEach(item=>{
            map[item.id] = item
        })

        data.forEach(item=>{
            let parent = item.parentId

            if(parent){
                if(!map[parent].children){
                    map[parent].children = []
                }
                map[parent].children.push(item)
            }else{
                result.push(item)
            }
        })

        return result

   }

console.log(arrTransTree(data))