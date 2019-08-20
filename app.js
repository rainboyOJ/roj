global.debug = require('debug')('debug')

/* 全局定义 __line */
// 来自 https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js
Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});

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
const DB = require('./DB')



const utils = require("./utils")

    //== 加载配置
    global.CONFIG = utils.loadConfig()
    debug(JSON.stringify(CONFIG,null,4))

DB.getInstance(CONFIG.MONGODB)



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

require("./routes")(app)




// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
