//得到sub的信息
const fs = require("fs");
const {count, debug} = require("console");
const Cache = require("../../lib/Cache")
const {isMongooseObjectId} = require("../../utils")
const {RESULT_LIST_MEAN}  = require("../../lib/DEFINE")


module.exports = async function getsub(ctx,next){
  let sid = ctx.params.sid

  if( !isMongooseObjectId(sid)){ //不正确的id
    ctx.redirect("/404")
    return
  }


  let doc = await Cache.get(`sub-${sid}`, ()=>{
    return db.model['sub'].findOne({_id:sid}).populate("uid","username realname email").populate("pid","pid title")
      .then(doc => doc.toJSON({virtuals:true}))
      .then( doc => {
      doc.result.map( result => {
        result.status = RESULT_LIST_MEAN[result.result] || "未知?"
      })
      return doc
    })
  })

  if( !doc ){
    ctx.redirect("/404")
    return
  }

  ctx.PID = doc.pid.pid // 为了使用 problem.test_data_list

  ctx.renderData = {
    ...ctx.renderData,
    sub: doc
  }
  //debug(ctx.renderData)

  await next()
}
