class Promise{
    constructor(fn) {
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        
        const reject = function(value){
            if(this.state === 'pending'){
                this.value = value
                this.state = 'resolved'
            }
        }
        
        const resolve = function(value){
            if(this.state === 'pending'){
                this.reason = value
                this.state = 'rejected'
            }
        }
        
        try{
            fn(reject,resolve)
        }catch(e){
            resolve(e)
        }
    }
    
    then(onFulfilled,onRejected){
        switch (this.state){
            case 'resolved':
                onFulfilled(this.value)
                break;
            case 'rejected':
                onRejected(this.reason)
            default:
                break;
        }
    }
}

Promise.prototype.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i in promises){
            promises[i].then(resolve,reject)
        }
    })
}

Promise.prototype.all = function(promises){
    let resultP = []
    const len = promises.length
    
    let resolveCount = 0
    
    return new Promise((resolve,reject)=>{
        for(let i of promises){
            promises[i].then((val)=>{
                resultP[i] = val
                resolveCount ++
                if(resultP.length === len && resolveCount === len){
                    resolve(resultP)
                }else if(resultP.length === len && resolveCount !== len){
                    reject(resultP)
                }
            },err=>{
                resultP[i] = err
                if(resultP.length === len && resolveCount === len){
                    resolve(resultP)
                }else if(resultP.length === len && resolveCount !== len){
                    reject(resultP)
                }
            })
        }
    })
}