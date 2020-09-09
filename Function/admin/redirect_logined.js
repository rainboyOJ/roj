/* 检查管理员是否已经登录 */
module.exports = async function redirect_logined(ctx,next){
    if( ctx.session.admin_login){
      ctx.redirect("/admin") //已经登录
    }
    else await next()
}
