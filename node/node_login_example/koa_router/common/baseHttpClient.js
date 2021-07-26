/**node 作为客户端向后端发起请求的基本http 请求的配置 */
const axios = require('axios');
const projectConfig = require('../utils/projectConfigResolever.js');
const hostBaseUrl = projectConfig.hostBaseUrl;
axios.defaults.baseURL = hostBaseUrl

exports.baseAxiosRequest = function (ctx, reqUrl, params, method) {
  
    if (method === 'GET') {
       return axios({
            method: 'GET',
            url: reqUrl,
            params
        });
    } else {
       return axios({
            method: '',
            url: reqUrl,
            data:params
        });
    }
   
   
};
exports.baseGetRequest = function (ctx, reqUrl, params) {
    return this.baseAxiosRequest(ctx, reqUrl,params,'GET')
};
exports.basePostRequest = function (ctx, reqUrl, params) {
    console.log(ctx, reqUrl, params, 'in baseHttpClient')
    return this.baseAxiosRequest(ctx, reqUrl, params, 'POST')
};
exports.basePutRequest = function (ctx, reqUrl, params) {
    return this.baseAxiosRequest(ctx,reqUrl, params, 'PUT')
};
exports.baseDelRequest = function (ctx, reqUrl, params) {
    return this.baseAxiosRequest(ctx,reqUrl,params, 'DELETE')
}
