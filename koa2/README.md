## 中间件的分类
 * 应用级别中间件
    ```
    表示匹配所有路由， 无论写在哪里都会先执行
     app.use(async(ctx,next) => {
        await  next()
     })
     表示只匹配 / 路由
     app.get('/',async(ctx,next) => {
         next()
     })
    ```
 * 路由级别中间件
    ```
    router.get('/',(ctx,next() => {
        next()
    }))
    ```
* 错误处理中间件
    ```

    ```