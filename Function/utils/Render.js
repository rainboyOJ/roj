/**
 * @description 渲染页面
 */

module.exports = async function Render(ctx,name,next){
  debug(ctx.renderData)
    await ctx.render(name, ctx.renderData)
}
