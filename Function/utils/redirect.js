/* 重定向 */
module.exports = async function redirect(ctx,redirect_url,next){
    if(ctx.go_redirect)
        ctx.redirect(redirect_url || "/")
    else
        await next()
}
