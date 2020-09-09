/* 
 * 用户登录
 * */
module.exports = async function login(ctx,next){
    let {username,password} = ctx.request.body
    debug(__function,username,password)
    
    let doc = await db.oneGet({
        model:'user',
        query:{
            username,
            password:password_salt(password),
            //is_del:false
        },
        select:{
            password:0
        }
    })
    if( doc ){
        ctx.session.login = true
        ctx.session._id = doc._id
        ctx.session.username = doc.username
        ctx.session.realname= doc.realname
        ctx.session.email = doc.email
        ctx.body = {
          ...ctx.should_ret,
          status:"redirect", //由前端来跳转
          url:'/',
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
