// 基础版

class Promise {
    constructor(fn) {
        // 三个状态
       this.state = 'pending'
       this.value = undefined
       this.reason = undefined

       let resolve = value=>{
           if(this.state === 'pending'){
               this.value = value
               this.state = 'resolved'
           }
       }

       let reject = value=>{
           if(this.state === 'pending'){
               this.reason = value
               this.state = 'rejected'
           }
       }

       try {
           fn(resolve,reject)
       } catch (error) {
           reject(error)
       }

       
    }

    // then
    then(onFulfilled,onRejected){
           switch (this.state) {
               case 'resolved':
                   onFulfilled(this.value)
                   break;
               case 'rejected':
                   onRejected(this.reason)
                   break
               default:
                   break;
           }
    }
}

let promise = new Promise((resolve,reject)=>{
    if(true){
        resolve('6666')
        
    }
})
promise.then(res=>{
    console.log(res);
    
})


// 进阶版
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
    let _this = this;
    _this.currentState = PENDING;
    _this.value = undefined;
    _this.resolvedCallbacks = [];
    _this.rejectedCallbacks = [];

    _this.resolve = function (value) {
        if (value instanceof MyPromise) {
            return value.then(_this.resolve, _this.reject)
        }
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.currentState = RESOLVED;
                _this.value = value;
                _this.resolvedCallbacks.forEach(cb => cb());
            }
        })
    };

    _this.reject = function (reason) {
        setTimeout(() => {
            if (_this.currentState === PENDING) {
                _this.currentState = REJECTED;
                _this.value = reason;
                _this.rejectedCallbacks.forEach(cb => cb());
            }
        })
    }
    try {
        fn(_this.resolve, _this.reject);
    } catch (e) {
        _this.reject(e);
    }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

    if (self.currentState === RESOLVED) {
        return (promise2 = new MyPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var x = onResolved(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        }));
    }

    if (self.currentState === REJECTED) {
        return (promise2 = new MyPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var x = onRejected(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        }));
    }

    if (self.currentState === PENDING) {
        return (promise2 = new MyPromise(function (resolve, reject) {
            self.resolvedCallbacks.push(function () {
                try {
                    var x = onResolved(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });

            self.rejectedCallbacks.push(function () {
                try {
                    var x = onRejected(self.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (r) {
                    reject(r);
                }
            });
        }));
    }
};

// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("Error"));
    }
    if (x instanceof MyPromise) {
        if (x.currentState === PENDING) {
            x.then(function (value) {
                resolutionProcedure(promise2, value, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
        return;
    }
    let called = false;
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        try {
            let then = x.then;
            if (typeof then === "function") {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolutionProcedure(promise2, y, resolve, reject);
                    },
                    e => {
                        if (called) return;
                        called = true;
                        reject(e);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// catch方法
MyPromise.prototype.catch = function (rejectFn) {
    return this.then(undefined, rejectFn)
}

//finally方法
MyPromise.prototype.finally = function (callback) {
    return this.then(
        value => MyPromise.resolve(callback()).then(() => value),
        reason => MyPromise.resolve(callback()).then(() => { throw reason })
    )
}

/* 
  静态方法添加
 */

// resolve方法
MyPromise.resolve = function (val) {
    return new MyPromise((resolve, reject) => {
        resolve(val)
    });
}

//reject方法
MyPromise.reject = function (val) {
    return new MyPromise((resolve, reject) => {
        reject(val)
    });
}

//race方法 
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        };
    })
}

const p = Promise.race([p1, p2, p3]);
//只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
MyPromise.all = function (promises) {
    let arr = [];
    let i = 0;

    function processData(index, data) {
        arr[index] = data;
        i++;
        if (i == promises.length) {
            resolve(arr);
        };
    };

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data);
            }, reject);
        };
    });
}

const p = Promise.all([p1, p2, p3]);
// Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用Promise.resolve方法，将参数转为 Promise 实例，
// 再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

// p的状态由p1、p2、p3决定，分成两种情况。

// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


