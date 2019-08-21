/* 重定向 */
module.exports = async function redirect(ctx,redirect_url,next){
    ctx.redirect(redirect_url || "/")
}
