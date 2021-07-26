const http = require('http');
const qs = require('querystring');
const url = require('url');
const userController = require('./control/userControl');
const server = http.createServer((req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        const reqUrl = req.url;
        const reqMethods = req.method;
        if (reqUrl.includes('login') && reqMethods === 'GET') {
            const reqParams = url.parse(reqUrl);
            const paramsObj = qs.parse(reqParams.query);
            userController.userLogin(paramsObj.username, paramsObj.password);
            res.writeHeader(200, {
               'Content-Type': 'text/plain'
            })
            res.end('user login ok')
        } else if (reqUrl.includes('loginOut') && req.method === 'GET') {
            const reqParams = url.parse(reqUrl);
            const queryObj = qs.parse(reqParams.query);
            userController.userLoginOut(queryObj.sessionId);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('user logout')
        } else {
            if (!reqUrl.includes('favicon.ico')) {
                /**
                 当用户执行的既不是登录也不是登出操作， 就说明用户在进行其他的请求 此时要重新设置用户的过期时间；
                 不用重新计算用户过期时间，只要用户在一直操作 就一直讲用户的过期时间推后30分钟。
                 */
                const urlParams = url.parse(reqUrl);
                const queryObj = qs.parse(urlParams.query);
                userController.userOprations(queryObj.sessionId)
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('user handle other opration')
            }
        }
    })
})
server.listen(3000, () => {
    console.log('server is ok')
})