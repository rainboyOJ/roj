/* 登出 */
module.exports = async function logout(ctx,next){
    if( ctx.session.login){
        ctx.session.login = null
        ctx.session._id = null
    }
    if( ctx.session.admin_login){
        ctx.session.admin_login = null
        ctx.session.admin_id = null
    }
    await next()
}
