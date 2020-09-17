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
    return db.model['user'].findOne({_id:uid})
      .populate("posted","pid title")
      .then( doc => doc.toJSON({virtuals:true}))
      .then( doc => {
          passed = doc.passed.map( d => d.toString())
          for(let item of doc.posted){
            if( passed.includes(item.id))
              item.succ = 1
            else
              item.succ = 0
          }
          return doc
        }
      )
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
