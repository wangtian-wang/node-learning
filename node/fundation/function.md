## 结论： node的文件都包裹在一个函数体中
## node最外层的函数体
```js
function (exports, require, module, __filename, __dirname) {
exports:为了实现commonJs的模块导出
require:为了实现commonJs的模块引入
module:为了实现commonJs的模块导出
__filename:当前文件所在的绝对目录
__dirname: 当前文件所在的文件夹绝对目录
}
```
## 为啥要这样设计
* 为了支持COMMONJS的实现
* 服务端的安全策略