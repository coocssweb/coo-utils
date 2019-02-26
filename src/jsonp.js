let domHeader = document.querySelector('head');

function toQueryStr(json) {
    if (!json) {
        return '';
    }
    let strQuery = '';
    for (let key in json) {
        strQuery += `${key}=${json[key]}`;
    }

    return strQuery;
}

// jsonp
function jsonp(url, callback, data) {
    let randomNum = `${ParseInt(Math.random() * 10000)}_${ParseInt(Math.random() * 10000)}`;
    let name = `callback_${randomNum}`;
    window[name] = function (data) {
        callback(data);
        delete window[name];
        domHeader.removeChild(document.querySelector(`#${name}`));
    };

    let script = document.createElement('script');
    script.setAttribute('src', `${url}${url.indexOf('?') > -1 ? '&':'?'}callback=${name}&${toQueryStr(data)}`);
    script.setAttribute('id', `${name}`);
    domHeader.appendChild(script);
}

// ajax
function ajax({url, method = 'get', data = {}, dataType = 'json', contentType = 'application/x-www-from-urlencoded', async = true, success = () => {}, fail = () => {}}) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState !== 4) {
            return false;
        }

        if (xmlHttp.status >= 200 && xmlHttp.status <= 304) {
            success(xmlHttp.responseText);
        } else {
            fail(xmlHttp.responseText);
        }
    };

    let requestUrl = url;
    if (method === 'get') {
        requestUrl += url.indexOf('?') > -1 ? '&' : '?';
        requestUrl += toQueryStr(data);
    }
    xmlHttp.dataType = dataType;
    xmlHttp.open(method, requestUrl, async);
    xmlHttp.send(data);
}
