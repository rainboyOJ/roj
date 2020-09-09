//得到sublist的数据进行ctx.renderData
const fs = require("fs");
const {count, debug} = require("console");
module.exports = async function subList(ctx,next){
  let page = parseInt(ctx.query.page || 1)
  const pageSize = 50; //一页的题目数量
  //let doc = await db.oneGet({model:'problem',query:{pid}})
  let docs = await db.model['sub'].find({is_del:false}).select("-code -result_list").sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize)
  .populate("uid","email username realname")
  .populate("pid","title pid")
  ctx.renderData = {
    ...ctx.renderData,
    subs:docs
  }
  await next()
}
