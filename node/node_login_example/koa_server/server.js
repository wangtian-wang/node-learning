const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    console.log(ctx)
    ctx.response.type = 'application/json';
    const responseBody = {
        result: {
            code: 0,
            description: 'success'
        },
        data: {
            username: 'haha',
            age: 11
        }
    };
    ctx.body = JSON.stringify(responseBody)
})
app.listen(3300, () => {
    console.log('server node is fine')
});