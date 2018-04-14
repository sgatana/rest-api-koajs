const koa  = require('koa');
const routes = require('./routes');
const db = require('./models');
const app = new koa();
const port = process.env.PORT || 3000
const bodyparser = require('koa-bodyparser');

app.use(bodyparser())
app.use(async(ctx, next) =>{
    try{
        await next();
    }
    catch(err){
        ctx.status = err.status || 500;
        ctx.body = err.message;
        // emit error for centralized reporting
        ctx.app.emit('error', err, ctx);
    };
});

app.use(routes.routes());

db.sequelize.sync().then(()=>{
    const server = app.listen(port)
    module.exports = server;
});
