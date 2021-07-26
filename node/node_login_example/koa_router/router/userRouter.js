/**
  node 作为中间层 和客户端 进行连接时候 对于前端请求地址的处理。
 */



const koaRouter = require('@koa/router');
const router = new koaRouter();
const userController = require('../controller/userController');
const userServerUrlMappingResolver = require('../config/server/userServerUrlMappingResolver');

router.post(userServerUrlMappingResolver.login, userController.login); // 路由隐射， 
module.exports = router;