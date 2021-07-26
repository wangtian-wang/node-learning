/**
 process.env.NODE_ENV = 'dev' ; 用于判断当前的node运行环境 这个是约定俗称的定义， 但是不能在程序内部定义， 需要在程序外部文件里面定义
 问题： 如何在项目里面定义项目的运行环境？？



 因为process是eventEmiter的实例，所以自然有时间监听的方法；
 process.on('exit'. () => {
    在这里面的代码，在结束的时候执行
 })
 process.exit(0) 参数为0 代表正常退出

process.on('beforeExit', ()=> {})

 process.on('uncaughtException', (error 错误的信息) => {
  node 执行时候，在某个调用的时候发生了错误，没有被任何层面的代码处理掉，就会将错误抛到主线程，如果主线程也没有处理错误，导致程序挂掉；
  作为一种最后的事件处理；

 }

 监听操作系统的信号；
 当操作系统中断的时候会触发；
 process.on('SIGINT', () => {
 
 })

process.nextTick(cb, [...args])
在程序执行当中，按照从上往下的顺序，在下一个同步代码执行完毕之后，或者下一个异步代码执行之前 这个回调方法会被调用。
当将要执行的代码不能明确是异步或者同步的时候，不能使用；
如果使用不当，会造成死循环；

const fs = require('fs');
const fn = () => {
    console.log('exec in nextTick')
};
code1：
        process.nextTick(fn)
code2:
       console.log(fs.readFileSync('./app.js').toString('utf-8'));   
code3:
        fs.readFile('./app.js', (,err,data) => {
            console.log(data)
        })

代码的执行顺序为 code2 code1 code3
规律：nextTick 总是在它后面定义的同步代码之后，异步代码之前执行  

 */