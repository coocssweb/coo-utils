!(function () {
    function CooJsBridge () {

    }

    CooJsBridge.prototype = {
        invoke: function (method, data, callback) {
            
        },
        call: function () {
            
        },
        log: function () {
            
        },
        on: function () {
            
        }
    };

    var cooJsBridge = new CooJsBridge();

    // callback 处理，分发为success / cancel / fail
    function withCallback (method, response, callback) {
        delete response.err_code;
        delete response.err_desc;
        delete response.err_detail;
        var errMsg = response.err_msg;
        delete response.err_msg;
        callback = callback || {};
        // 数据预处理
        callback._handle && callback._handle(response);

        var indexOfSplit = errMsg.indexOf(':');
        switch (errMsg.substring(indexOfSplit + 1)) {
            case 'ok':
                callback.success && callback.success(response);
                break;
            case 'cancel':
                callback.cancel && callback.cancel(response);
                break;
            default:
                callback.fail && callback.fail(response)
        }
        callback.complete && callback.complete(response);
    }

    // 调用jsBridge，向native发送请求
    function invoke(method, data, callback) {
        cooJsBridge && cooJsBridge.invoke(method, data, function (result) {
            withCallback(method, result, callback);
        });
    }

    // 注册事件，向native发送请求
    // 如：停止录音，需要注册开始停止，结束停止两个事件
    function trigger (method, data, callback) {
        cooJsBridge && cooJsBridge.on(method, function (response) {
            callback && callback.trigger && callback.trigger(response);
            withCallback(method, response, callback);
        });
    }

    // 面向网页端
    var jCoo = {
        getNetworkType: function (info) {
            info._handle = function (result) {
                var message = result.errMsg;
                result.errMsg = 'getNetworkType:ok';
                var subtype = result.subtype;
                delete result.subtype;
                if (subtype) {
                    result.networkType = subtype;
                } else {
                    var index = message.indexOf(':'),
                        subtype = result.substring(index + 1);
                    switch (subtype) {
                        case "wifi":
                        case "edge":
                        case "wwan":
                            result.networkType = subtype;
                            break;
                        default:
                            result.errMsg = 'getNetworkType:fail'
                    }
                }
                return result;
            };

            invoke(
                'getNetworkType',
                {},
                info || {}
            );
        },
        closeWindow: function (info) {
            invoke(
                'closeWindow',
                {},
                info || {}
            );
        },
        openMenuShare: function (info) {
            invoke(
                'openMenuShare',
                {
                    title: info.title,
                    desc: info.desc,
                    imgUrl: info.imgUrl,
                    link: info.link
                },
                info
            )
        },
        chooseImage: function (info) {
            cooJsBridge.trigger('chooseImage',
                {
                    scene: '1|2',
                    count: info.count || 9,
                    sizeType: info.sizeType || ['original', 'compressed'],
                    sourceType: info.sourceType || ['album', 'camera']
                },
                info
            );
        },
        previewImage: function (photo) {
            invoke('previewImage', photo);
        },
        uploadImage: function (info) {
            invoke(
                'uploadImage',
                {
                    localId: info.localId,
                    isShowProgressTips: 0 === info.isShowProgressTips ? 0 : 1
                },
                info
            );
        }
    };

    this.coo = this.jCoo = jCoo;
}).call(window);