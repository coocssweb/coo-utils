/**
 * for：文件上传
 * Created by 王佳欣 on 2018/11/4.
 */
import File from './file';

function Uploader (options) {
    let defaults = {
        chunkSize: 1024 * 1024,
    };

    this.options = Object.assign(defaults, options);
    this.queue = [];
}

// 上传下一个文件
Uploader.prototype.next = function () {
    
};

// 上传成功
Uploader.prototype.success = function () {

};

Uploader.prototype.error = function () {
    
};