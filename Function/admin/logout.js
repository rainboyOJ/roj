/* 登出 */
module.exports = async function logout(ctx,next){
    ctx.session.admin_login = false
    ctx.go_redirect = true
    await next()
}
