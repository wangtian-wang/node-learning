const koa = require('koa');
const path = require('path');
const routerCombine = require('koa-combine-routers');
const bodyparser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const koaGizp = require('koa-compress');
const userRouter = require('../router/userRouter');
const app = new koa();
app.use(koaGizp({
    threshold: 2048
}));
app.use(bodyparser());
app.use(koaStatic(path.join(__dirname, '../dist')));
const unifiedRouters = routerCombine(userRouter)();
app.use(unifiedRouters);
module.exports = app;