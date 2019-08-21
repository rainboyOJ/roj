
const Koa = require('koa')
const app = new Koa()
const favicon = require("koa-favicon")
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session2");
const Store = require("./lib/Session_store.js")
const pathFn = require('path')
const md5 = require("md5")

/* ========= 初始化 =========*/
require("./init")(app)
/* ========= 初始化 END =========*/


// error handler
onerror(app)


app.use(session({
    key: "SESSIONID",   //default "koa:sess"
    store: new Store()
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(favicon(pathFn.resolve(CONFIG.FRONT_END.public+'/images/favicon.png')))
app.use(require('koa-static')(pathFn.resolve(CONFIG.FRONT_END.public)))

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

// routes

require("./routes")(app)




// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
