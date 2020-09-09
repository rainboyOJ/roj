/* 登出 */
module.exports = async function logout(ctx,next){
    if( ctx.session.login) ctx.session = {}
    ctx.go_redirect = true
    await next()
}
