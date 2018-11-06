/**
 * 文件chunk
 * Created by 王佳欣 on 2018/11/4.
 */
function Chunk () {
    this.offset = offset;
    this.retries = 0;
    this.pendingRetry = false;
    this.preprocessState = 0;
    this.readState = 0;
    this.loaded = 0;
    this.total = 0;
    this.chunkSize = this.uploader.opts.chunkSize
    this.startByte = this.offset * this.chunkSize;
    this.endByte = this.computeEndByte();
    this.xhr = null;
}

// 发送请求
Chunk.prototype.send = function () {
    this.xhr = new XMLHttpRequest();
    // 上传进度
    this.xhr.upload.addEventListener('progress', this.progress.bind(this), false);
    // 上传完成
    this.xhr.addEventListener('load', this.success.bind(this), false);
    // 上传错误
    this.xhr.addEventListener('error', this.error.bind(this), false);

    let uploadMethod = utils.evalOpts(this.uploader.opts.uploadMethod, this.file, this);
    let data = this.prepareXhrRequest(uploadMethod, false, this.uploader.opts.method, this.bytes);
    this.xhr.send(data);
};

// 取消上传
Chunk.prototype.abort = function () {
    let xhr = this.xhr;
    this.xhr = null;
    this.processingResponse = false;
    this.processedState = null;
    if (xhr) {
        xhr.abort();
    }
};

// 上传进度
Chunk.prototype.progress = function () {

};

// 上传成功
Chunk.prototype.success = function () {
    
};

// 上传失败
Chunk.prototype.error = function () {
    
};

export default Chunk;