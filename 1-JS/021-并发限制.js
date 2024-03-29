// function requestLimit(urls, limit) {
// 	const arr = [...urls]
// 	const p = []

// 	for (let i =0;i<limit;i++) {
// 		let url = arr.shift()
// 		p.push(fetch(url).then(() => {
// 			callback(p,limit,arr)
// 		}, () => {
// 			callback(p,limit,arr)
// 		}))


// 	}
// }


// function callback(p, limit,arr) {
// 	console.log(p)
// 	p.pop()

// 	if (p.length < limit && arr.length) {
// 		let url = arr.shift()
// 		p.push(fetch(url).then(() => {
// 			callback(p,limit,arr)
// 		}, () => {
// 			callback(p,limit,arr)
// 		}))
// 	}
// }


// const requestUrls = ['a','b','c','d','e','f']

// requestLimit(requestUrls,3)


var urls = [
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
];


function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            console.log("一张图片加载完成");
            resolve(img);
        };
        img.onerror = function () {
            reject(new Error('Could not load image at' + url));
        };
        img.src = url;
    });
}


function limitLoad(urls, handler, limit) {
    let sequence = [].concat(urls); // 复制urls
    // 这一步是为了初始化 promises 这个"容器"
    let promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            // 返回下标是为了知道数组中是哪一项最先完成
            return index;
        });
    });
    // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
    return sequence
        .reduce((pCollect, url) => {
            return pCollect
                .then(() => {
                    return Promise.race(promises); // 返回已经完成的下标
                })
                .then(fastestIndex => { // 获取到已经完成的下标
                    // 将"容器"内已经完成的那一项替换
                    promises[fastestIndex] = handler(url).then(
                        () => {
                            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
                        }
                    );
                })
                .catch(err => {
                    console.error(err);
                });
        }, Promise.resolve()) // 初始化传入
        .then(() => { // 最后三个用.all来调用
            return Promise.all(promises);
        });
}
limitLoad(urls, loadImg, 3)
    .then(res => {
        console.log("图片全部加载完毕");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });



    // https://juejin.cn/post/6844904077537574919#heading-56