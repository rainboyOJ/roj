/* 
 * 管理员登录
 * */
module.exports = async function login(ctx,next){
    let {username,password} = ctx.request.body
    debug(username,password)
    
    let doc = await db.oneGet({
        model:'admin',
        query:{
            username,
            password:password_salt(password),
            is_del:false
        },
        select:{
            password:0
        }
    })
    if( doc )
        ctx.body = doc.toObject()
    else
        ctx.body = {
            status:-1,
            message:"用户名或密码错误!"
        }
}
