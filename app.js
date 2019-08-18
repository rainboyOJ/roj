global.debug = require('debug')('debug')

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session2");
const Store = require("./lib/Session_store.js")
const pathFn = require('path')



const utils = require("./utils")

    //== 加载配置
    global.CONFIG = utils.loadConfig()
    debug(JSON.stringify(CONFIG,null,4))


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
app.use(require('koa-static')(pathFn.resolve(CONFIG.FRONT_END.public)))

app.use(views(pathFn.resolve(CONFIG.FRONT_END.views), {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

var {index, register, login, captcha }= require("./routes/ex")

app.use(index.routes())
app.use(register.routes())
app.use(login.routes())
app.use(captcha.routes())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
