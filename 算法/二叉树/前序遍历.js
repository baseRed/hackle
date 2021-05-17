// 递归实现

var preOrderTraversal = function(root){
    let result = []
    var preOrderTraverseNode = function(node){
        if(node){
            result.push(node.val)

            preOrderTraverseNode(node.left)

            preOrderTraverseNode(node.right)
        }
    }

    preOrderTraverseNode(root)

    return result
}


// 迭代实现

var preOrderTracersal = function(root){
    const list = []
    const stack = []

    if(root){
        stack.push(root)
    }

    while(stack.length > 0){
        const currentNode = stack.pop()
        list.push(currentNode.val)

        // 由于先遍历左子树 所以左子树后入栈
        if(currentNode.right !== null){
            stack.push(currentNode.right)
        }

        if(currentNode.left !== null){
            stack.push(currentNode.left)
        }
    }

    return list
}