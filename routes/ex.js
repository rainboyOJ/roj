const RouterIns = require("koa-route-ex")


async function Render(ctx,name,next){
  await ctx.render(name, {
    title: 'Hello Koa 2!'
  })
}

async function redirect(ctx,argument,next){
    ctx.redirect(argument)
}

RouterIns.register([Render, redirect,require("../Function/utils/captcha") ])

var middlewares = [
    {
        name:'redirect',
        argument:'/register'
    }
]

const index = RouterIns.create('/',middlewares)
const register = RouterIns.create('/register',[
    {
        name:'Render',
        argument:'register'
    }
])
const login = RouterIns.create('/login',[
    {
        name:'Render',
        argument:'login'
    }
])

const captcha = RouterIns.create('/captcha',['captcha'])

module.exports  = {
    index,
    register,
    login,
    captcha

}


