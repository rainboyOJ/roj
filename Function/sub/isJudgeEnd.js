// 判断评测结果是不是已经结束
const DEFINE = require("../../lib/DEFINE")
const { isMongooseObjectId } = require("../../utils")
const Cache = require("../../lib/Cache")
module.exports = async function isJudgeEnd(ctx,next){

  let {_id} = ctx.request.body

  if( ! isMongooseObjectId(_id) ){ //非ObjectId格式
    ctx.redirect("/404")
    return
  }

  let KEY = `isJudgeEnd-${_id}`
  let isJudgeEnd_time_request_limit = await Cache.redis.get(KEY)

  if( isJudgeEnd_time_request_limit ){ //存在
    ctx.body = {
      status:0,
      message:DEFINE.JUDGING,
      judgeEnd:false
    }
    return
  }

  Cache.redis.set(KEY,1,'EX',3) // 3s才能请求一次

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
