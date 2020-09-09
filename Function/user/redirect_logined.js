/* 已经登录,就redirect*/
module.exports = async function redirect_logined(ctx,next){
    if( ctx.session.login){
      ctx.redirect("/") //已经登录
    }
    else await next()
}
