// 根据返回的值处理对应的sub
const DEFINE = require("../../DEFINE")
const _ = require("lodash")

module.exports = async function set_sub(ctx,next){
  console.log(ctx)
  switch(ctx.result){
    case DEFINE.JUDGE.SUCCESS:
      let passed = ctx.result_list.map( d =>d.result==0? 1:0)
      await db.oneUpdate({
        model:'sub',
        query:{_id:ctx.sid},
        update:{
          step:DEFINE.JUDGE_RESULT_MAP_STEP[ctx.result],
          result:ctx.result_list,
          update_at:Date.now(),
          score:[_.sum(passed),passed.length]
        }
      })
      break
    case DEFINE.JUDGE.COMPILE_ERROR:
    case DEFINE.JUDGE.COMPILE_SPJ_ERROR:
    case DEFINE.JUDGE.OTHER_ERROR:
      await db.oneUpdate({
        model:'sub',
        query:{_id:ctx.sid},
        update:{
            step:DEFINE.JUDGE_RESULT_MAP_STEP[ctx.result],
            error:ctx.message,
            update_at:Date.now()
          }
        })
      break
    default:
      await db.oneUpdate({
        model:'sub',
        query:{_id:ctx.sid},
        update:{ step:-1, error:"末知错误" } })
      debug('发生了末知的错误')
  }

  //await next()
}
