//当post数据的时候如果这个,没有登录,就redirect login
//      [
module.exports = async function redirect_not_logined_for_post(ctx,next){
    if( !ctx.session.login){
      ctx.body = {
        status:"redirect",
        url:"/login"
      }
    }
    else await next()
}
