// 根据返回的值处理对应的 problem
const DEFINE = require("../../DEFINE")
const _ = require("lodash")

module.exports = async function set_problem(ctx,next){
  ctx.set_problem = {}

  let update_problem_doc = {
    $inc : { posted:1, passed: (!!ctx.set_sub.passed)}, // 更新题目 passed post
  }

  // 只有passed 都加入best sub
  if( ctx.set_sub.passed ){
    update_problem_doc["$push"] = { //更新加入 bestSub
      bestSub:{
        $each:[{
          sid: ctx.uid.sid || ctx.sid,
          create_at:Date.now(),
          total_memory:ctx.set_sub.total_memory,
          total_time:ctx.set_sub.total_time,
          uid:ctx.set_sub.uid }],
        $sort:{total_time:1,total_memory:1,create_at:-1},
        $slice: DEFINE.CONTAIN_BESTSUB_COUNT || 10
      }
    }
  }
  //更新 bestSub
  let problem = await db.model['problem'].findOneAndUpdate({ _id:ctx.set_sub.pid},update_problem_doc)

  ctx.set_sub.level = problem.level; //题目难度,积分
  //debug("+++++++++++++++++++++")
  //debug(ctx.set_sub
  //debug(problem)
  //debug("+++++++++++++++++++++")

  await next()
}
