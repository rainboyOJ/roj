// 根据返回的值处理对应的sub
const DEFINE = require("../../DEFINE")
const _ = require("lodash")

function get_status(ctx){
    if( ctx.result === DEFINE.JUDGE.SUCCESS){
      for( let {result} of ctx.result_list )
        if( result !=0 ) return DEFINE.RESULT_LIST_MEAN[result]
      return DEFINE.RESULT_LIST_MEAN[0] //Accept
    }
    return ctx.result === -1 ? "其它错误" : ctx.result
}

/* 
{
  method: 'GET',
  path: '/problem',
  sid: '5f5c3272ba59bbdd86832bd2',
  socket_client_id: 'GpcVETxB57jnh5-CAAAg',
  uid: '{"method":"GET","path":"/problem","sid":"5f5c3272ba59bbdd86832bd2"}',
  result: 0,
  message: 'OK',
  result_list: [
    {
      cpu_time: 0,
      real_time: 1,
      memory: 1527808,
      signal: 0,
      exit_code: 0,
      error: 0,
      result: 0
    },
    ...
    ]
  params: {}
}
 * */

module.exports = async function set_sub(ctx,next){

  //console.log("===================================================")
  //console.log(ctx)
  //console.log("===================================================")
  ctx.set_sub = {sid:ctx.sid} //在这一层里产生的数据
  let update_doc
  switch(ctx.result){
    case DEFINE.JUDGE.SUCCESS:
      let passed_count = _.sum( ctx.result_list.map( d =>d.result==0? 1:0) )
      
      //是否通过这个题目
      ctx.set_sub.passed = passed_count  === ctx.result_list.length
      if( ctx.set_sub.passed) { //通过了 ,设定总时间与总内存
        ctx.set_sub.total_memory= 
          ctx.result_list.reduce( (tot,{memory})=>tot+memory,0)
        ctx.set_sub.total_time= 
          ctx.result_list.reduce((tot,{cpu_time})=>tot+cpu_time,0)
      }
      //debug(ctx.set_sub)

      update_doc = await db.model['sub'].findOneAndUpdate({ _id:ctx.sid },{
          total_memory: ctx.set_sub.total_memory,
          total_time: ctx.set_sub.total_time,
          result:ctx.result_list,
          update_at:Date.now(),
          score:[passed_count,ctx.result_list.length],
          status:get_status(ctx),
      })
      break
    case DEFINE.JUDGE.COMPILE_ERROR:
    case DEFINE.JUDGE.COMPILE_SPJ_ERROR:
    case DEFINE.JUDGE.OTHER_ERROR:

      update_doc = await db.model['sub'].findOneAndUpdate({ _id:ctx.sid },{
        error:ctx.message,
        update_at:Date.now(),
        status:get_status(ctx)
      })
      break
    default:
      update_doc = await db.model['sub'].findOneAndUpdate({ _id:ctx.sid },{ status:"JudgeServer Unkown Error", error:"末知错误" })
      debug('发生了末知的错误',__filename,__line)
  }
  //debug(update_doc)

  ctx.set_sub.pid = update_doc.pid  //对应题目的pid
  ctx.set_sub.uid = update_doc.uid  //对应用户的uid
  //debug(ctx.set_sub)


  await next()
}
