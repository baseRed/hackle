// 转换规则
// 转换为原始值
// 转换为数字
// 转换为字符串

// ToPrimitive(转换为原始值)



// 转换为字符串

// 1. 调用 toString方法，如果为基础性，则返回，否则下一步
// 2. 调用valueOf方法，如果为基础性，则返回，否则下一步
// 3. 抛出TypeError异常


// 转为数字

// 1. 调用valueOf方法，如果为原始值，则返回，否则下一步
// 2. 调用toString方法，如果为原始值，则返回，否则下一步
// 3. 抛出TypeError异常




// toNumber
// undefined   NaN
// null    0
// boolean true 1      false 0
// number      等于输入值
// string      
// object   设原始值为ToPrimitive(输入参数暗示数字类型)


// toString
// undefined   'undefined'
// null    'null'
// boolean true 'true'      false 'false'
// number      则有比较长的规范,毕竟范围比较大
// 常见的就是 '1' NaN则为'NaN' 基本等同于上面一条 对于负数，则返回-+字符串 例如 '-2' 其他的先不考虑了
// string      
// object   设原始值为ToPrimitive(输入参数暗示数字类型)



// 运算隐式转换
// 对于+运算来说，规则如下：

// +号左右分别进行取值，进行ToPrimitive()操作
// 分别获取左右转换之后的值，如果存在String，则对其进行ToString处理后进行拼接操作。
// 其他的都进行ToNumber处理
// 在转换时ToPrimitive，除去Date为string外都按照ToPrimitive type为Number进行处理



























// https://juejin.cn/post/6844903610016923661#heading-6