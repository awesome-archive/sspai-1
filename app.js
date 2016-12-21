const Koa = require('koa');
const app = new Koa();

const pullArticle = require('./spider/index.js').pullArticle;

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);

});

app.use(async (ctx) => {
    const html = await pullArticle();
    const title = html.map((item) => {
        return item.title
    })

    ctx.body = `<div>${title.join('<br/>')}</div>`;
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('listen at 127.0.0.1:3000')
    }
});

module.exports = app;