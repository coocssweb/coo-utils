function ajax({url, method = 'get', data = {}, contentType = 'application/json', dataType = 'json', async = true}, success = () => {}, fail = () => {}) {
    // xmlhttprequest
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        // 0: 未初始化
        // 1: 载入
        // 2: 载入完成
        // 3: 交互
        // 4: 完成
        if (xmlHttpRequest.readyState === 4) {
            if (xmlHttpRequest.status >= 200 && xmlHttpRequest.status <= 304) {
                // status
                // 200 from cache, from disk
                // 204 Not content
                // 301 重定向
                // 304 not modify，lastModifyTime，E-Tag
                // 401 forbidden
                // 404 not found
                // 5xx error
                success(xmlHttpRequest.responseText);
            } else {
                fail(xmlHttpRequest.responseText);
            }
        }
    };

    let requestUrl = url;

    if (method === 'get') {
        let queryStr = '';
        for (let key in data) {
            queryStr += `${key}=${data[key]}&`;
        }
        queryStr.trimEnd('&');
        requestUrl = `${url}${(queryStr.indexOf('?') > -1 ? `&` : `?`)}${queryStr}`;
    }

    // contentType
    // application/json
    // text/xml
    // application/x-www-form-urlencoded
    // multipart/form-data
    // false
    xmlHttpRequest.contentType = contentType;
    xmlHttpRequest.dataType = dataType;
    xmlHttpRequest.open(method, requestUrl, async);
    xmlHttpRequest.send(data);
}

function jsonp(url, data = {}, callback = () => {}) {
    // 回调函数名
    let id = parseInt(Math.random(10) * 1000);
    let callbackName = `callback_${id}`;

    // jsonp 请求url
    let queryStr = '';
    for (let key in data) {
        queryStr += `${key}=${data[key]}&`;
    }
    queryStr.trimEnd('&');
    let requestUrl = `${url}${(queryStr.indexOf('?') > -1 ? `&` : `?`)}${queryStr}`;

    // 标签创建
    let script = document.createElement('<script>');
    script.setAttribute('id', callbackName);
    script.setAttribute('src', requestUrl);
    document.head.appendChild(script);

    // 回调函数调用
    window[callbackName] = function (...args) {
        callback(...args);
        delete window[callbackName];
        document.head.removeChild(script);
    }

}