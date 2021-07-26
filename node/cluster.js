/**
 node 当中的集群概念
 */










 





 /*
 在node当中开启子进程
 cluster ： childrocess的封装 创建多个子进程  利用cpu的内核数量 来启动相应的子进程 提高效率
 前提条件 ： 子进程运行在主进程里面，必须先开启一个子进程从而来开启一个或者多个子进程

        
        master worker mode
        当fork出来了子进程之后 每个子进程干的工作就是 对当前的文件 从头到尾的执行
         isMaster 判断是否是主进程 确保程序的正常运行
         主进程是 使用 node 命令运行脚本的那个线程


         多个子进程监听同一个端口号 ？？？
        
                主进程和子进程之间通过 socket 进行双向通信； 以事件方式进行
                当请求进来之后，最先到达主进程，主进程 基于 轮训或者操作系统的方式 将请求分发给不同的子进程 的调度策略；
                当子进程拿到数据后，发送给主进程，
         
        多个子进程之间工作的模式？？？？
                谁先谁监听，档期监听的子进程会持续监听一段时间，当浏览器停止对服务器的访问后 再间隔一段时间 再次请求服务器 子进程就会切换
 */

//  父子进程的模式
const cluster = require('cluster');
const os = require('os');
const http = require('http');
const cpuCount = os.cpus().length;
// 判断 当前是父进程还是子进程

if (cluster.isMaster) {
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(worker.process.pid)
    })




} else {
    const server = http.createServer((req, res) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(`${process.pid}`)
        })
    });
    server.listen(3000, () => {
    console.log('server is ready at port 3000');
})
}