
const Cache = require("../../lib/Cache")
const {isMongooseObjectId} = require("../../utils")
const markdown = require("../../markdown-r/index")

module.exports = async function bbs_update_post(ctx,next){

  let {tid,title,content,is_del=false}= ctx.request.body

  if( !isMongooseObjectId(tid)){ //不正确的id
    ctx.body = {
      status:-1,
      message:'不正确的tid'
    }
    return
  }


  let topic = await db.model['topic'].findOne({_id:tid}).populate("uid")
  if( !topic){
    ctx.body = {
      status:0,
      message:'文章不存在!'
    }
  }

  if( topic.uid._id.toString() !== ctx.session._id.toString()){
    ctx.body = {
      status:0,
      message:'这篇文章不是你创建的!'
    }
    return
  }

  await db.model['topic'].findOneAndUpdate(
    {_id:tid},
    {title,content,is_del}
  )

  ctx.body = {
    status:0,
    message:'更新完成'
  }
}
