/**
 * @description 生成title
 */

module.exports = async function title(ctx,title,next){
    ctx.renderData.title = title
    await next()
}
