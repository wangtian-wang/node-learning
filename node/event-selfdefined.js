/**
 node 当中的事件模型
 采用经典的观察者模式
 on('eventname', listener === (也就是回调函数callback));


 */
const listener1 = (req, res) => {
    res.end('req1 end')
 }
const listener2 = (req, res) => {
    res.end('req2 end')

}
const listener3 = (req, res) => {
    res.end('req3 end')

}

httpServer.on('request', listerer1(req, res));
httpServer.on('request', listerer2(req, res));
httpServer.on('request', listerer3(req, res));

// 当请求被监听到的时候， 所有的listenter都会执行； 但是response只能响应一个 第一个response被响应 其他的都会被抛弃

httpServer.off(listener1);
httpServer.removeAllListeners('request')

/**
 * 最大事件数
 */


// httpServer.setMaxListeners(2) 手动设置 listener的数量
// node  的每个事件监听器 所能注册的listener只有10个 超出了这个范围 就会报警 报警的个数为 你设置的listener的数量 + 1

/**
 * 自定义事件

    事件的顺序很重要 先要监听 然后载发射事件 否则的话 先发射 再监听事件 发射的时候 没有相应的事件监听器 就会导致事件丢失
 */


httpServer.on('selfEvent', (data1, data2, data3) => {
    
})
httpServer.emit('selfEvent', 'data', 'data2', 'data3')
 
