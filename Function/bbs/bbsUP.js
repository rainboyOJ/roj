//点赞功能的实现
const Cache =  require("../../lib/Cache")
const { isMongooseObjectId}   = require("../../utils/index")
module.exports = async function bbsUP(ctx,next){
    let {tid} = ctx.request.body
    if( !isMongooseObjectId(tid) ){
      ctx.body ={
        status:-1,
        message:`tid 不是 MongooseObjectId类型`
      }
      return
    }

    //0 限制请求频率
    let can_request = await Cache.can_Request(`${ctx.session._id}-${tid}`)
    if( !can_request ){
      ctx.body = {
        status:0,
        message:'请限制自己访问的频率!'
      }
      return
    }

    //1 是不是已经赞过
    let doc = await db.model['topic'].findOne({is_del:false,_id:tid})
  if( !doc){
      ctx.body = {
        status:0,
        message:'没有这篇文章!'
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
      await db.model['topic'].findOneAndUpdate({_id:tid},{
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
