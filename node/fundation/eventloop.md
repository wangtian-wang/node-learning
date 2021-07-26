## 事件模型的6个阶段
## 第一阶段 timer 定时器阶段 setTimeout setInterval
* 开始计时
* 执行定时器的回调函数
## 第二阶段 pending callback（系统准备阶段）
## 第三阶段 idle， prepare（准备阶段）
## 第四阶段 poll（轮询阶段 核心阶段）
* 如果回调队列里面有待执行的回调函数 ***同步的回调函数在轮训阶段执行，异步的回调在指定的阶段执行***
     * 从回调队列里面取出回调函数，一个一个执行，直到回调队列为空，或者达到了系统的最大限度
* 如果回调队列为空
     * 如果有设置过setImmediate
        * 进入check阶段，为了执行setImmediate所设置的回调
     * 如果未设置过setImmediate
        * 在此阶段停留，等待回调函数被铺设进入回调队列
        * 若定时器到点了，进入之后的阶段，等待本轮循环完成，去执行定时器的回调函数 在第一阶段
## 第五阶段 check (专门执行setImmediate执行的回调)
## 第六阶段 close callback
## process.nextTick() 设置立即执行函数（能在任意阶段优先执行 vip 用户  但是还是主线程的任务优先）
## 轮训计时的问题
* 当有主线程任务存在的时候，当定时器的延时时间为0的时候， 
   任务的执行顺序为 主线程 ————> 定时器 ———> Immediate
* 当延时器有设置时间的时候 延时器最后执行
```js
setTimeout(() => {
    console.log('settimeout')
});
setImmediate(() => {
    console.log('setImmediate')
});
console.log('main process');
```