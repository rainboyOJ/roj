
const Koa = require('koa')
const app = new Koa()
const favicon = require("koa-favicon")
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
//const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const logger = require('koa-logger')
const session = require("koa-session2");
const Store = require("./lib/Session_store.js")
const pathFn = require('path')
const md5 = require("md5")
const mount = require("koa-mount")

/* ========= 初始化 =========*/
require("./init")(app)
/* ========= 初始化 END =========*/


// error handler
onerror(app)


app.use(session( 
    Object.assign(
        CONFIG.SESSION,
        { store: new Store() }
    ) 
));

// middlewares
app.use(koaBody({ multipart: true }));
app.use(json())
app.use(logger())
app.use(favicon(pathFn.resolve(CONFIG.FRONT_END.public+'/images/favicon.png')))
app.use(require('koa-static')(pathFn.resolve(CONFIG.FRONT_END.public)))
app.use( mount('/markdown', require('koa-static')(pathFn.join(__project,'markdown-r/assets'))));

app.use(views(pathFn.resolve(CONFIG.FRONT_END.views), {
    extension: 'pug',
    options:{
        /*
         *filters:{
         *    'email2avatar': function(email){
         *        return CONFIG.AVATAR_CDN.replace('{md5}',md5(email))
         *    }
         *},
         */
        'email2avatar': function(email){
            return CONFIG.AVATAR_CDN.replace('{md5}',md5(email))
        }
    }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// judge 算是
//
require("./lib/judge")
require("./lib/judge_deal") //处理judge之后的返回值

// routes
require("./routes")(app)



app.use(function(ctx,next){
  ctx.redirect("/404")
})



// error-handling
app.on('error', (err, ctx) => {
    debug(err)
    debug(err.message)
  //console.error('server error', err, ctx)
});


module.exports = app
