/**
 * @description 生成renderData
 */

module.exports = async function renderData(ctx,argument,next){
  if( /^ctx\./.test(argument))
    ctx.renderData = {
      ...ctx.renderData,
      ...ctx[argument.split(".")[1]]
    }
  else
    ctx.renderData = {
      ...ctx.renderData,
      ...argument
    }
  await next()
}
