/* 
 * 管理员登录
 * */
module.exports = async function login(ctx,next){
    let {username,password} = ctx.request.body
    debug(__function,username,password)
    
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
    if( doc ){
        ctx.session.admin_login = true
        ctx.session.admin_id = doc._id
        ctx.body = {
          ...ctx.should_ret,
          status:"redirect", //由前端来跳转
          url:'/admin',
          message:"ok"
        }
    }
    else
        ctx.body = {
          ...ctx.should_ret,
          status:-1,
          message:"用户名或密码错误!"
        }
}
