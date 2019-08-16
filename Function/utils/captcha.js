const svgCaptcha = require('svg-captcha')

module.exports = async function captcha(ctx,next){
    var captcha = svgCaptcha.create()
    ctx.session.captcha = captcha.text
    debug('generate captcha: ', captcha.text)
    ctx.type = 'svg'
    ctx.body = captcha.data
}
