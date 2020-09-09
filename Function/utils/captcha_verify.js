/*  验证 验证 
 * */
const {debug} = require("console")
module.exports = async function captcha_verify(ctx,next){
    let {captcha} = ctx.request.body
    debug(__function)
    debug(`captcha: ${captcha}`)
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
