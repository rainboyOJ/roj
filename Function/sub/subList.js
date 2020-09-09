//得到sublist的数据进行ctx.renderData
const fs = require("fs");
const {count, debug} = require("console");
const {pageNation} = require("../../utils/index")
const {subList_pageSize} = require("../../lib/DEFINE")
const Cache = require("../../lib/Cache")


module.exports = async function subList(ctx,next){
  let page = parseInt(ctx.query.page || 1)
  if( isNaN(page)){ //不正确的id
    ctx.redirect("/404")
    return
  }

  const pageSize = subList_pageSize; //一页的题目数量

  let docs = await Cache.get(`subList-${page}`,()=>{
      return db.model['sub'].find({is_del:false}).select("-code -result_list").sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize)
    .populate("uid","email username realname")
    .populate("pid","title pid").then( docs => docs.map(doc => doc.toObject({virtuals: true})) )
  })


  let count = await Cache.get(`subList-totalsize`,()=>{
    return db.model['sub'].find({is_del:false}).countDocuments()
  })

  ctx.renderData = {
    ...ctx.renderData,
    subs:docs,
    pagenation:pageNation(page,count,pageSize)
  }

  await next()
}
