/* 如果管理员没有登录,就跳转 */
module.exports = async function redirect_not_logined(ctx,next){
    if( !ctx.session.admin_login){
      ctx.redirect("/admin/login") //已经登录
    }
    else await next()
}
