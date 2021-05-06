Function.prototype.myapply = function(context){
    if(typeof this !== 'function'){
        throw new Error('error')
    }
    // 还需考虑 context 为 数字 字符串的情况
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(args)
    delete context.fn
    return result
}