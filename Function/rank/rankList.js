//得到sublist的数据进行ctx.renderData
const fs = require("fs");
const {count, debug} = require("console");
const {pageNation} = require("../../utils/index")
const {rankList_pageSize} = require("../../lib/DEFINE")
const Cache = require("../../lib/Cache")


module.exports = async function rankList(ctx,next){
  let page = parseInt(ctx.query.page || 1)
  if( isNaN(page)){ //不正确的id
    ctx.redirect("/404")
    return
  }

  const pageSize = rankList_pageSize; //一页的用户数量

  let docs = await Cache.get(`rankList-${page}`,()=>{
      return db.model['user'].find({is_del:false}).sort({rank:-1}).skip((page-1)*pageSize).limit(pageSize)
  })


  let count = await Cache.get(`rankList-totalsize`,()=>{
    return db.model['user'].find({is_del:false}).countDocuments()
  })

  ctx.renderData = {
    ...ctx.renderData,
    users:docs,
    pagenation:pageNation(page,count,pageSize)
  }

  await next()
}
