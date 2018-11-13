# 一些有用的Javascript工具类

### 源于哪里？
项目开发中，发现有一些工具类是基本上每个项目我会用到的。因此重新整理了一下，方便自己使用。

### 为什么不用NPM管理？
因为这样我可以适时的根据不同的项目，对这些类做一些小调整。

### 它们都有什么？

```bash
├──compose.js                     * compose，实现多个function的合并处理
├──cookies.js                     * cookie，处理浏览器的cookies操作
├──html2json.js                   * 将html转化为json对象（使用场景比较适合用于服务端如node）
├──image.js                       * 一些图片处理方法，如：加载、压缩等
├──isApp.js                       * 当前浏览器是不是安卓、苹果、微信、微博、QQ等
├──observer.js                    * 事件观察者模式
├──propertyProxy.js               * 数据的defineProperty的封装类
├──share.js                       * 第三方平台的分享，可自定义标题、封面图、分享链接等（微信、QQ、微博）
├──storage.js                     * localstorage的一些操作（可设置过期时间）
├──uuid.js                        * 根据UserAgent、访问时间、随机数生成的一个唯一值
├──uploader.js                    * 文件上传、带进度、断点续传、分片上传等方法
├──timeago.js                     * 一些时间处理，如时间格式化、倒计时、时间间隔等等
├──throttler.js                   * 防抖、节流
├──coo                            * 一些常用操作类，如深度拷贝、对象相等判断、精确的类型获取
```

### demo
每个工具类代码注释中有对应的demo

### 测试单元
mocha
```bash
npm run test
```
