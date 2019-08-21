/* 
 * 得到 admin 的信息
 *
 * @params {model,_idname} Db-model-name,id_name to query
 * */

module.exports = async function userInfo(ctx,next){
    ctx.renderData = ctx.renderData || {}
    let {admin_id} = ctx.session
    let info = await db.userInfo(admin_id,false)
    if( info ){
        debug(info)
        ctx.renderData.user = info
        await next()
    }
    else
        ctx.body = {
            status:-1,
            message:'没要找到这个用户!'
        }
}
