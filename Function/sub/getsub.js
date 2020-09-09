//得到sub的信息
const fs = require("fs");
const {count, debug} = require("console");
const Cache = require("../../lib/Cache")
const {isMongooseObjectId} = require("../../utils")

module.exports = async function getsub(ctx,next){
  let sid = ctx.params.sid

  if( !isMongooseObjectId(sid)){ //不正确的id
    ctx.redirect("/404")
    return
  }


  let doc = await Cache.get(`sub-${sid}`, ()=>{
    return db.model['sub'].findOne({_id:sid}).populate("uid","username realname email").populate("pid","pid title")
  })

  if( !doc ){
    ctx.redirect("/404")
    return
  }

  ctx.renderData = {
    ...ctx.renderData,
    sub: doc
  }
  debug(ctx.renderData)

  await next()
}
