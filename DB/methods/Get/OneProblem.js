//得到一个题目的信息
//
const Cache = require("../../../lib/Cache")
module.exports = function (pid){
  return Cache.get(`problem-${pid}`,()=>{
    return this.model['problem'].findOne({pid}).populate("bestSub.uid","username realname email").then( doc => doc.toObject({virtuals:true}))
  })
}
