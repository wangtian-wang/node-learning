/**
 websocket 是http 的升级模式 在首次连接的时候 是需要使用http模块 创建一个http连接 之后 upgrade 为websocket 连接 ;
 当socket连接之后 无论是客户端 还是服务端都可以中断连接；

 * 
 */
const server = require('http');
const { disconnect } = require('process');
const socketIo = require('socket-io');


let httpServer = http.createServer((req, res) => {
    res.writeHeader(200, { 'Content-Type': 'text/html' });

})
httpServer.listen(3000, 'localhost');
let socketServer = socketIo.listen(httpServer);
socketServer.on('connection', (socket) => {
    // socket 标识与客户端建立连接的socket对象
    socket.on('message', (msg) => {

    })
    socket.on('open', () => {

    })
    socket.on('disconnect', () => {

    })
    socket.send('hello client');
    socket.emit('selfDefinedEvent', data); // 发射自定义事件
    socket.on('selfClientEvent', () => {
        
    })
    socket.once();

    // 利用自定义事件 来在不同的客户端之间进行消息的传递
    // + boradcast 向所有连接的客户端发送消息 一对多 多个客户端统一收到相同的服务端的消息
    socket.on('clientBoradCastEvent', (data) => {
        socket.boradcast.emit('BoradCastEventToClient', data)
    })
})
/**
在客户端引入 websocket的方法；
 1：当client 和 server的文件位于同一级目录的时候；可以使用socket提前封装在内部的路径；
  <script src="/socket.io/socket.io.js" ></script>

 */

const socketClient = io('http://localhost:3000');
socketClient.on('message', (msg) => {

})
socketClient.on('disconnect', () => {

})
socketClient.on('selfDefinedEvent', (data) => {
    // 监听服务端的自定义事件
    socketClient.emit('selfClientEvent', data)
});



// 聊天室模式
socketClient.emit('clientBoradCastEvent', 'data');


socketClient.on('BoradCastEventToClient', () => {

})