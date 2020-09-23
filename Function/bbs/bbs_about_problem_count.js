//得到某个题目的解析的数量
const Cache = require("../../lib/Cache")
module.exports =async function bbs_about_problem_count(ctx,next){
  let pid = ctx.renderData.problem._id

  let count = await Cache.get(`bbs_about_problem_count_${pid}`,()=>{
    return db.model['topic'].find({is_del:false,pid}).countDocuments();
  })

  ctx.renderData = {
    ...ctx.renderData,
    bbs_about_problem_count:count
  }

  await next()
}
