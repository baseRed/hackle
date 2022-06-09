function List() {
    // 节点
    let Node = function (element) {
        this.element = element
        this.next = null
    }

    // 初始头结点为null
    let head = null

    // 链表长度
    let length = 0

    // 操作
    this.getList = function () {
        return head
    }

    this.search = function (element) {
        let p = head
        if (!head) {
            return false
        }

        while (p) {
            if (element === p.element) {
                return true
            }
            p = p.next
        }

        return false
    }

    this.append = function (element) {
        let node = new Node(element)
        let p = head
        if (!head) {
            head = node
        } else {
            while (p.next) {
                p = p.next
            }
            p.next = node
        }

        length += 1
    }

    this.insert = function (position, element) {
        let node = new createNode(element)
        if (position >= 0 && position <= length) {
            let prev = head,
                curr = head,
                index = 0
            if (position === 0) {
                node.next = head
                head = node
            } else {
                while (index < position) {
                    prev = curr
                    curr = curr.next
                    index++
                }
                prev.next = node
                node.next = curr
            }
            length += 1
        } else {
            return null
        }
    }

    this.remove = function (element) {
        let p = head, prev = head
        if (!head) return
        while (p) {
            if (p.element === element) {
                p = p.next
                prev.next = p
            } else {
                prev = p
                p = p.next
            }
        }
    }

    this.isEmpty = function () {
        return head ? true : false
    }

    this.size = function () {
        return length
    }

}