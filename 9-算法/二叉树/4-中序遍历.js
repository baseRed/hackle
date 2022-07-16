// 递归实现
function midSortFn(root) {
    let result = []

    function deep(node) {
        if (node) {
            if (node.left) {
                deep(node.left)
            }
            result.push(node.val)

            if (node.right) {
                deep(node.right)
            }
        }
    }

    deep(root)

    return result

}


// 迭代实现

function midSortFn(root) {
    let list = []
    let stack = []
    let node = root

    while(stack.length || node){
        while(node){
            stack.push(node)
            node = node.left
        }

        node = node.pop()
        list.push(node.val)
        node = node.right
    }

    return list
}