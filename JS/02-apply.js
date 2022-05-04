Function.prototype.myapply = function(context){
    if(typeof this !== 'function'){
        throw new Error('error')
    }

    context = !context ? window : typeof context === 'object' ? context : {},
    context.fn = this
    const args = [...arguments][1]
    const result = context.fn(...args)
    delete context.fn
    return result
}