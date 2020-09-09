/* 
 * 适用于需要携带captcha post的场景
 * 每一次的询问都会 改变 captcha,并返回captcha svg
 * */
const svgCaptcha = require('svg-captcha')

module.exports = async function captcha_change(ctx,next){
    var captcha = svgCaptcha.create(CONFIG.CAPTCHA || {})
    var captcha_text = captcha.text.toLowerCase()
    ctx.session.captcha = captcha_text
    debug('change generate captcha: ', captcha_text)
    ctx.should_ret = {captcha:captcha.data}
    await next();
}
