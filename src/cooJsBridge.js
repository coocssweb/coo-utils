!(function (win, doc) {
    var sequence = function () {
        var sequenceId = 1;
        return function () {
            return sequenceId++;
        }
    }();

    window.__callbackMap = {};
    // 发送器
    function Messager () {
        var that = this;
        Object.defineProperty(this, '__callbackMap', {
            value: {},
            writable: !1,
            enumerable: !1,
            configurable: !1
        });

        Object.defineProperty(this, '_dataMap', {
            value: {},
            writable: !1,
            enumerable: !1,
            configurable: !1
        });

        Object.defineProperty(window, '__callbackMap', {
            get: function () {
                return that.__callbackMap;
            }
        });

        Object.defineProperty(window, '_dataMap', {
            get: function () {
                return that._dataMap;
            }
        });
    }
    Messager.prototype = {
        registerCallback: function (eventName, callback, data) {
            this.__callbackMap[eventName] = callback;
            this._dataMap[eventName] = data;
        },
        removeCallback: function (eventName) {
            delete this.__callbackMap[eventName];
            delete this._dataMap[eventName];
        },
        send: function (command, data, uuid) {
            setTimeout(function() {
                var iframe = document.createElement('iframe');
                iframe.src = 'coo://' + command + '?callback=' + uuid;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                setTimeout(function() {
                    document.body.removeChild(iframe);
                }, 300);
            }, 0);
        }
    };

    var CooJsBridge = {
        __messager: new Messager(),
        __callbackMap: {},
        invoke: function (eventName, data, callback) {
            var uuid = sequence();
            this.__messager.registerCallback(uuid, function (response) {
                callback(response);
                this.__messager.removeCallback(uuid);
            }.bind(this));
            this.__messager.send(eventName, data, uuid);

            setTimeout(() => {
                window.__callbackMap[uuid]({
                    err_msg: "chooseImage:ok",
                    result: 1234
                });
            }, 1000);
        }
    };

    // 事件注册
    function dispatchEvent(eventName) {
        var event = document.createEvent('UIEvent');
        event.initEvent(eventName, false, false);
        document.dispatchEvent(event);
    }

    // 监听事件调用
    function addEventListener(eventName, fn) {
        document.addEventListener && document.addEventListener(eventName, fn, false);
    }

    // callback 处理，分发为success / cancel / fail
    function withCallback (eventName, response, callback) {
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
    function invoke(eventName, data, callback) {
        CooJsBridge.invoke(eventName, data, function (result) {
            withCallback(eventName, result, callback);
        });
    }

    // 注册事件，向native发送请求
    // 如：停止录音，需要注册开始，结束两个事件
    function trigger (eventName, data, callback) {
        // CooJsBridge.on(eventName, data, function (response) {
        //     withCallback(eventName, response, callback);
        // });
    }
    
    if (!window.jCoo) {
        var jCoo = {
            ready: function (fn) {
                fn();
            },
            getNetworkType: function (info) {
                info._handle = function (result) {
                    var message = result.errMsg;
                    result.errMsg = 'getNetworkType:ok';
                    var subtype = result.subtype;
                    delete result.subtype;
                    if (subtype) {
                        result.networkType = subtype;
                    } else {
                        var index = message.indexOf(':');
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
                invoke('chooseImage',
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
            },
            invoke: function (info) {
                info = info || {};
                info(info.eventName, info.data, info);
            },
            trigger: function (info) {
                info = info || {};
                trigger(info.eventName, info.data, info);
            }
        };

        this.coo = this.jCoo = jCoo;

        addEventListener(jCoo.ready);

        dispatchEvent('CooJSBridgeReady');
    }
}).call(window, window.document);