let path = '';      // 最终路径
const stack = [];   // 路径栈

const dfs = (root) => {
  stack.push(root);                                    // 根节点入栈
  if (root.children && root.children.length) {         // 未到边界，继续入栈
    for (let i = 0; i < root.children.length; i++) {   // 循环所有子元素
      dfs(root.children[i]);                           // 递归子元素
    }
    stack.pop();                                       // 子元素全部执行后，当前元素出栈
  } else {                                             // 到达边界，处理边界
    const top = stack.pop();                           // 出栈边界值
    if (top.val === 'F') {                             // 若为F，则为终点，拼接路径
      stack.forEach(item => path += `${item.val} -> `);
      path += 'F';
    }
  }
}

bfs(root);   // path ~ A -> B -> D -> F


const root = {
    val: 'A',
    children: [
        {
            val: 'B',
            children: [
                {
                    val: 'D',
                    children: [
                        {
                            val: 'E'
                        },
                        {
                            val: 'H',
                            children: [
                                {
                                    val: 'G'
                                }
                            ]
                        }
                    ]
                },
                {
                    val: 'I'
                }
            ]
        },
        {
            val: 'c'
        }
    ]
  }
  