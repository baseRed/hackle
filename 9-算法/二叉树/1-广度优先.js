// 广度优先遍历的本质是队列

const bfs = (root) => {
    let path = '';     // 最终路径
    const queue = [];  // 查找队列
    queue.push(root);  // 入列根节点
  
    while (queue.length) {  // 循环直到找到目标值或者队列为空                                 
      const head = queue.shift();  // 队首出列
  
      if (head.val === 'F') {  // 找到目标值，处理相关路径
        head.pre && head.pre.forEach(item => path += `${item} -> `);
        path += 'F';
        break;
      }
  
      if (head.children) {  // 将该元素下的子元素分别入列
        for (let i = 0; i < head.children.length; i++) {
          const pre = head.pre ? [...head.pre, head.val] : [head.val];
          head.children[i].pre = pre;  // 记录前置元素，用于生成路径
          queue.push(head.children[i]);
        }
      }
    }
  
    return path;
  }

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
  
  const path = bfs(root);   // A -> B -> D -> F


  