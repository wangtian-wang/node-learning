var express = require("express");
var router = require("./router");
var bodyParser = require("body-parser");

var server = express();
// 配置模板引擎和 body-parser 一定要在使用路由之前 中间件的执行流程 必须先配置了才能使用
server.engine("html", require("express-art-template"));
server.use("/node_modules/", express.static("./node_modules"));
server.use("/public/", express.static("./public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(router); // router 要使用的话,必须依赖前面的设置,所以必须在设置之后,再使用 router

server.listen(3000, () => {
  console.log("server is working");
});
/**
 * 但凡想拿到一个异步函数的回调结果,必须使用回调函数的方式
 */
