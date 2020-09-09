// 判断评测结果是不是已经结束
const DEFINE = require("../../lib/DEFINE")
module.exports = async function isJudgeEnd(ctx,next){
  let {_id} = ctx.request.body
  let doc = await db.model['sub'].findOne({_id})
  if( !doc ){
    ctx.redirect("/404")
    return
  }
  debug(doc.status)

  if( doc.status === DEFINE.JUDGING)
    ctx.body = {
      status:0,
      message:DEFINE.JUDGING,
      judgeEnd:false
    }
  else
    ctx.body = {
      status:0,
      message:doc.status,
      judgeEnd:true
    }
}
