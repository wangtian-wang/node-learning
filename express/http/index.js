// let http = require("http");
// let server = http.createServer();
// server.on("request", (req, res) => {
//   req; // 获取客户端的请求信息
//   req; // 返回客服端数据
//   console.log(req.url);
//   // res.write("hello, 123");
//   res.end("hello, 12345"); // 结束响应,可以展示给用户数据了
//   console.log("accept request");
//   // 响应内容只能是字符串 , 所以服务器返回的都是字符串
// });
// // 绑定端口, 启动服务器
// server.listen(8000, () => {
//   console.log("server start success");
// });
let os = require("os");
console.log(os);
console.log(os.cpus());
console.log(os.totalmem());
// node 中间存在模块作用域; 就是一个 JS 文件,就是一个作用域,作用域之间的数据不共享 不会发生冲突
/** require 方法的作用
 *  1: 加载并且解析文件模块里面的代码
 * 2: 拿到被加载模块导出的接口的对象
 *
 * */
/** export 方法的作用
 * 1: 每个文件模块都提供了一个对象 export 对象,默认值为空
 * 2:  var res = require(./b)   res为 require 的返回值 是一个被引入模块的对象
 *
 * */
