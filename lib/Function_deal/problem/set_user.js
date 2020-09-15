// 根据返回的值处理对应的 user
const DEFINE = require("../../DEFINE")
const _ = require("lodash")

module.exports = async function set_user(ctx,next){
  //得到user_id

  let user_id = ctx.set_sub.uid
  let pid = ctx.set_sub.pid
  //更新,
  if(ctx.set_sub.passed){ //通过了这个题目
    let update_doc = await db.model['user'].findOneAndUpdate({_id:user_id,passed:pid},{
      "$inc":{ postedCount:1,passedCount: 1 }
    })

    //debug("+++++++++++in user+++++++++++")
    //debug(update_doc)
    //debug("++++++++++++++++++++++")

    if( !update_doc){ //没有更新成功,则说明这是第一通过个题目
      let t = await db.model['user'].findOneAndUpdate({_id:user_id},{
        "$addToSet":{passed:pid,posted:pid},  //记录通过，提交的题目
        "$inc":{rank: ctx.set_sub.level, postedCount:1,passedCount: 1 } //增加积分,题目的等级
      })

      //debug("+++++++++++in uset t+++++++++++")
      //debug(t)
      //debug("++++++++++++++++++++++")
    }
  }
  else { //没有通过
    let update_doc = await db.model['user'].findOneAndUpdate({_id:user_id},{
      "$inc":{ postedCount:1},
      "$addToSet":{posted:pid}
    })
  }
  await next()
}
