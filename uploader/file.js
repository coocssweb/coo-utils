/**
 * 文件
 * Created by 王佳欣 on 2018/11/4.
 */
import Chunk from './chunk';
function File (file) {
    this.file = file;
    this.chunks = [];
    this.name = file.fileName || file.name;
    let reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.addEventListener('load', function(e) {

    });

    // 获取预览图
    reader.readAsDataURL();
    reader.onload = function (response) {
        // 预览图
    }
}

// 上传下一片
File.prototype.next = function () {

};

// 成功
File.prototype.success = function () {
    
};

// 错误
File.prototype.error = function () {
    
};

// 开始上传
File.prototype.upload = function () {

};

// 放弃上传
File.prototype.abort = function () {

};

export default File;

