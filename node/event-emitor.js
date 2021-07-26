const eventEmitter = require('events');
const emitter = new eventEmitter();
const emitter1 = new eventEmitter();
emitter.on('event', function listener1 () {
    
})
emitter.on('event', function listener2 (params1, params2) {
    console.log(params1, params2)
})
emitter.on('event', function listener3 (...argus) {
    console.log(...argus)
})


// 得到事件的所有listeners
const listenerCount = emitter.listeners('event');
console.log(listenerCount, 'in count');

emitter.emit('event', 'data1', 'data2', 'data3', 'data4')

/**
 newListeners 事件
 当有事件监听器被监听的时候， newListeners 事件就会被触发；
 监听这个时间的时候 不能在这个事件的回调函数里面 再次监听事件 否则会陷入递归的死循环
 */

emitter1.once('newListener', (event, listener) => {
    if (event === 'event1') {
        emitter1.on('event1', (data) => {
            console.log('data form event 1' + data)
        })
    }
})

emitter1.on('event1', (data) => {
    console.log(`data from  event1 outside newListener ${data}`)
})
emitter1.emit('event1', 12345)