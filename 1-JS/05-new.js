function New(func){
    var o = {}
    if(func.prototype != null){
        o.__proto__ = func.prototype
    }

    var ret = func.apply(o,[...arguments].slice(1))

    if((typeof ret === 'object' || typeof ret === 'function') && ret !== null){
        return ret
    }

    return o
}    