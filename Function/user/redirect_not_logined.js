/* 没有登录,就redirect*/
module.exports = async function redirect_not_logined(ctx,next){
    if( !ctx.session.login){
      ctx.redirect("/login") 
    }
    else await next()
}
