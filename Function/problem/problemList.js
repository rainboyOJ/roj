//得到problem的数据进行ctx.renderData
const fs = require("fs");
const {count, debug} = require("console");
module.exports = async function problemList(ctx,next){
  let page = parseInt(ctx.query.page || 1)
  const pageSize = 50; //一页的题目数量
  //let doc = await db.oneGet({model:'problem',query:{pid}})
  let docs = await db.model['problem'].find({is_del:false}).select("-content").sort({pid:1}).skip((page-1)*pageSize).limit(page)
  ctx.renderData = {
    ...ctx.renderData,
    problems:docs
  }
  debug(ctx.renderData)
  await next()
}
