Function.prototype.mybind = function(context){
    if(typeof this !== 'function'){
        throw new Error('error')
    }
    const args = [...arguments].slice(1)
    const self = this

    const fb = function(){
        const bindArgs = [...arguments]
        self.apply(this instanceof fb ? this : context, [...args,...bindArgs])
    }

    fb.prototype = this.prototype

    return fb
}