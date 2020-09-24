//给评论点赞
const Cache =  require("../../lib/Cache")
const { isMongooseObjectId}   = require("../../utils/index")
module.exports = async function replyUP(ctx,next){
    let {rid} = ctx.request.body
    if( !isMongooseObjectId(rid) ){
      ctx.body ={
        status:-1,
        message:`tid 不是 MongooseObjectId类型`
      }
      return
    }

    //0 限制请求频率
    let can_request = await Cache.can_Request(`${ctx.session._id}-${rid}`)
    if( !can_request ){
      ctx.body = {
        status:0,
        message:'请限制自己访问的频率!'
      }
      return
    }

    //1 是不是已经赞过
    let doc = await db.model['reply'].findOne({is_del:false,_id:rid})

  if( !doc){
    ctx.body = {
      status:0,
      message:'没有这个回复!'
    }
    return;
  }

    if( doc.ups.includes(ctx.session._id)){
      ctx.body = {
        status:0,
        message:'你已经赞过了!'
      }
      return;
    }
    else {
      await db.model['reply'].findOneAndUpdate({_id:rid},{
        $addToSet:{ups:ctx.session._id},
        $inc:{ups_count:1}
      })

      ctx.body={
        status:0,
        message:'点赞成功!',
        up:true
      }
    }
}
