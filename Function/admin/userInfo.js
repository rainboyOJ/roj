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
    }
    else
        //ctx.throw(500,"没要找到这个用户!")
        //ctx.recdirect('/register')
        ctx.go_redirect = true
        //ctx.body = {
            //status:-1,
            //message:''
        //}
    await next()
}
