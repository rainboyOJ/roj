//得到天梯前5
const fs = require("fs");
const {count, debug} = require("console");
const {pageNation} = require("../../utils/index")
const {rankList_pageSize} = require("../../lib/DEFINE")
const Cache = require("../../lib/Cache")


module.exports = async function rankTop5(ctx,next){

  let docs = await Cache.get(`rankTop5`,()=>{
      return db.model['user'].find({is_del:false}).sort({rank:-1}).limit(5)
  })

  //用户的个人排名
  let uid = ctx.session._id
  let user = await Cache.get(`user-${ctx.session._id}`, ()=>{
    return db.model['user'].findOne({_id:uid}).then( doc => doc.toJSON({virtuals:true}))
  })

  let gt_user_count = await Cache.get(`gt-rank-${user.rank}`,()=>{
    return db.model['problem'].find({is_del:false,rank:{ $gt:user.rank}}).countDocuments()
  })

  ctx.renderData = {
    ...ctx.renderData,
    rankTop5:docs,
    gt_user_count
  }

  await next()
}
