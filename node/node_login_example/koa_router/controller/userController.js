/** node 作为中间方 拿到前端发送过来的请求体的数据后  向真正的服务器发送请求的路由控制器 */
/**
 * 后端服务器返回的数据格式
     {
        result: {
            code: 0,
            description: success,
        },
        data : {
            
        }
     }
 */

const qs = require('qs');
const baseHttpClient = require('../common/baseHttpClient'); // node 向后端发送请求的request的封装
const userRequestUrlMappingResolver = require('../config/server/userServerUrlMappingResolver'); // 引入定义好的 向后端发送对应请求的URL配置文件
console.log(baseHttpClient, 'baseHttpClient')
class UserController {
    async login (ctx) {
        const requestUrl = userRequestUrlMappingResolver.login;

        console.log(ctx,requestUrl, 1111)
        const response = await baseHttpClient.basePostRequest(ctx, requestUrl, JSON.stringify(ctx.request.body));
        console.log(response, 22222)
        const responseData = qs.parse(response.data);
        if (responseData.result.code === 0) {
            ctx.body = responseData;
        } else {
            ctx.body = 'fail'
        }
    }
}
module.exports = new UserController();