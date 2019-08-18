/**
 * @description 生成renderData
 */

module.exports = async function renderData(ctx,argument,next){
    ctx.renderData = argument || {}
    await next()
}
