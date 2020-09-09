// 对题目进行评测
const judgeServer = require("../../lib/judge")
module.exports = async function judge(ctx,next){
  // 得到评测的数据
  let {lang,code,auto_io,pid,_pid} = ctx.request.body
  debug({lang,code,auto_io,pid,_pid})

  // 创建sub
  let doc = await db.model['sub'].create({pid:_pid,uid:ctx.session._id,lang,code,auto_io})

  let problem = await db.oneGet({model:'problem',query:{pid},select:"memory time stack spj file_io_input_name file_io_output_name"})
  
  debug(doc)
  debug(problem)
  let uid = JSON.stringify({
    method:'GET',
    path:'/problem', //普通的题目的提交
    sid:doc._id      //哪个提交
  })
  judgeServer.judge(uid,{
    code,
    id:pid,
    lang,
    auto_io,
    spj:problem.spj,
    memory:problem.memory,
    stack:problem.stack,
    time:problem.time,
    "file_in":problem.file_io_input_name,
    "file_out":problem.file_io_output_name,
  })
  ctx.body = {
    status:0,
    message:'提交成功!'
  }
}
