/*  验证 验证 
 * */
module.exports = async function captcha_verify(ctx,next){
    let {captcha} = ctx.request.body
    if( ctx.session.captcha  && captcha){
        if( captcha.toLowerCase() === ctx.session.captcha){
            await next();
            return;
        }
    }
    ctx.body = {
        status:-1,
        message:"验证码不正确!"
    }
}
