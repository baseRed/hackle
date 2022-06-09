function DoublyLinkedList() {
    let Node = function (element) {
        this.element = element
        // 前驱指针
        this.prev = null
        // 后继指针
        this.next = null
    }
    // 初始头节点为 null
    let head = null
    // 新增尾节点
    let tail = null

    // 链表长度
    let length = 0
    // 操作
    this.search = function (element) {
        // 同单向链表
    }
    this.insert = function (position, element) {
        // 创建插入节点
        let node = new Node(element)
        if (position >= 0 && position < length) {
            let prev = head,
                curr = head,
                index = 0
            if (position === 0) {
                // 在第一个位置添加
                if (!head) { // 注意这里与单链表不同
                    head = node
                    tail = node
                } else {
                    // 双向
                    node.next = head
                    head.prev = node
                    // head 指向新的头节点
                    head = node
                }
            } else if (position === length) {
                // 插入到尾节点
                curr = tial
                curr.next = node
                node.prev = curr
                // tail 指向新的尾节点
                tail = node
            } else {
                while (index < position) {
                    prev = curr
                    curr = curr.next
                    index++
                }
                // 插入到 prev 后，curr 前
                prev.next = node
                node.next = curr
                curr.prev = node
                node.prev = prev
            }
            length += 1
            return true
        } else {
            return false
        }

    }
    this.removeAt = function (position) {

        if (position >= 0 && position < length && length > 0) {
            let prev = head,
                curr = head,
                index = 0
            if (position === 0) {
                // 移除头节点
                if (length === 1) { // 仅有一个节点
                    head = null
                    tail = null
                } else {
                    head = head.next
                    head.prev = null
                }
            } else if (position === length - 1) {
                // 移除尾节点
                curr = tial
                tail = curr.prev
                tail.next = null
            } else {
                while (index < position) {
                    prev = curr
                    curr = curr.next
                    index++
                }
                // 移除curr
                prev.next = curr.next
                curr.next.prev = prev
            }
            length -= 1
            return curr.element
        } else {
            return null
        }

    }
    this.isEmpty = function () { return length === 0 }
    this.size = function () { return length }
}
