//得到user的信息
const {isMongooseObjectId} = require("../../utils")
const Cache = require("../../lib/Cache")

module.exports = async function info(ctx,next){
  let {uid} = ctx.params

  if( !uid ) { //是自己
    ctx.renderData.user_can_modify = true
    uid = ctx.session._id
  }

  if( !isMongooseObjectId(uid)){ //不正确的id
    ctx.redirect("/404")
    return
  }

  let doc = await Cache.get(`user-${uid}`, ()=>{
    return db.model['user'].findOne({_id:uid}).then( doc => doc.toJSON({virtuals:true}))
  })

  if( !doc ){ //没有找到
    ctx.redirect("/404")
    return
  }

  ctx.renderData = {
    ...ctx.renderData,
    user:doc
  }

  await next()
}
