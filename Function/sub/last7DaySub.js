//最近的7天的提交
const moment = require("moment")
const Cache = require("../../lib/Cache")
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = async function last7DaySub(ctx,next){
  let time = moment().endOf("day").subtract(7, 'days').toDate();
  // 如果有params.uid 就先它
  let uid = ctx.params.uid || ctx.session._id

  let doc = await Cache.get(`last7DaySub-${uid}`,()=>{
    return db.model['sub'].aggregate([
      {
        $match:{uid:ObjectId(uid),create_at: { $gte:time}}
      },
      {
        $group:{
          _id:{$dayOfYear:"$create_at"},
          passedCount:{ $sum:{
            $cond:[{$eq:["$status","Accept"]},1,0]
          },
          },
          postedCount:{$sum:1},
          time:{$min:"$create_at"}
        }
      },
      {
        $project : {
          passedCount:1,
          postedCount:1,
          day:{$dayOfMonth:"$time"},
          month:{$month:"$time"},
        }
      }
    ]).then ( doc => doc.reverse())
  })
  debug(doc)

  ctx.renderData = {
    ...ctx.renderData,
    last7DaySub : doc
  }

  await next();
}
