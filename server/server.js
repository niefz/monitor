/**
 * Created by NieFZ on 2017/6/21.
 */
const path = require('path');
const Koa = require('koa2');
const bodyParser = require('koa-bodyparser')();
const historyApiFallback = require('koa2-history-api-fallback')();
const json = require('koa-json')();
const logger = require('koa-logger')();
const koaRouter = require('koa-router')();
const koaStatic = require('koa-static');
const cros = require('kcors')();
const ajax = require('./routes/ajax.js');

const app = new Koa();

app.use(cros);
app.use(bodyParser);
app.use(json);
app.use(logger);
app.use(historyApiFallback);

app.use(async(ctx, next) => {
  try {
    await next();
    ctx.response.body = {
      data: ctx.body,
    };
  } catch (err) {
    if (401 === err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        data: 'Protected resource, use Authorization header to get access'
      };
    } else if (404 === err.status) {

    } else {
      throw err;
    }
  }
});

app.use(async function pageNotFound(ctx) {
  ctx.status = 404;
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found';
  }
});

app.use(koaStatic(path.resolve(__dirname, 'src')));

koaRouter.use('', ajax.routes());

app.use(koaRouter.routes())
  .use(koaRouter.allowedMethods());;

app.on('error', function(err, ctx){
  console.log(err);
  logger.error('server error', err, ctx);
});

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

module.exports = app;