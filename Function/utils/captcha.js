const svgCaptcha = require('svg-captcha')

module.exports = async function captcha(ctx,next){
    var captcha = svgCaptcha.create(CONFIG.CAPTCHA || {})
    var captcha_text = captcha.text.toLowerCase()
    ctx.session.captcha = captcha_text
    debug('generate captcha: ', captcha_text)
    ctx.type = 'svg'
    ctx.body = captcha.data
}
