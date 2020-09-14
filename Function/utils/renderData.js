/**
 * @description 生成renderData
 */

module.exports = async function renderData(ctx,argument,next){
  if( process.env.DEBUG !== 'debug'){
    ctx.renderData = {
      ...ctx.renderData,
      USE_CDN:true      //使用cdn的资源
    }
  }
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
