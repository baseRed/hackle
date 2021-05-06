Function.prototype.mycall = function(context){
    if(typeof this !== 'function'){
        throw new Error('error')
    }
    context = !context ? window : typeof context === 'object' ? context : {}
    const args = [...arguments].slice(1)
    context.fn = this
    const result = context.fn(args)
    delete context.fn
    return result
}

var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.mycall(null); // 2