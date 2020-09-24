
const Cache = require("../../lib/Cache")
const {isMongooseObjectId} = require("../../utils")
const markdown = require("../../markdown-r/index")

module.exports = async function bbs_update(ctx,next){
  let tid = ctx.params.tid

  if( !isMongooseObjectId(tid)){ //不正确的id
    ctx.redirect("/404")
    return
  }

  let doc = await db.model['topic'].findOne({_id:tid}).populate("uid")

  if( !doc ){
    ctx.redirect("/404")
    return
  }

  if( doc.uid._id.toString() !== ctx.session._id.toString()){
      ctx.redirect("/404")
      return
  }


  ctx.renderData = {
    ...ctx.renderData,
    topic: doc,
    user:doc.uid,
    update:true     //表示要更新
  }

  await next()
}
