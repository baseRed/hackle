function ajax({url, methods, body, headers}) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(url, methods);
        for(let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value);
        }
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                if(request.status >= '200' && request.status < 300) {
                    resolve(request.responeText);
                } else {
                    reject(request)
                }
            }
        }
        request.send(body)
    })
}
