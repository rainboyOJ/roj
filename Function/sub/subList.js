//得到sublist的数据进行ctx.renderData
const fs = require("fs");
const {count, debug} = require("console");
const {pageNation} = require("../../utils/index")
const {subList_pageSize} = require("../../lib/DEFINE")
const Cache = require("../../lib/Cache");
const Json2QueryUrl = require("../../utils/methods/Json2QueryUrl");


module.exports = async function subList(ctx,next){
  let page = parseInt(ctx.query.page || 1)

  if( isNaN(page)){ //不正确的id
    ctx.redirect("/404")
    return
  }

  let {pid,realname} = ctx.query
  let query = {}
  let raw_query = {}
  if( realname )     {
    raw_query.realname= realname
    let user = await Cache.get(`user-${realname}`,()=>{
      return db.model['user'].findOne({realname})
    })
    if( user )
      query.uid = user._id
    else
      query.uid = null
  }

  pid = parseInt(pid)
  let queryUrl = ''
  if( !isNaN(pid) ) {
    raw_query.pid = pid
    queryUrl = Json2QueryUrl({...query,pid})
    let problem = await db.GetOneProblem(pid)
    if( problem)
      query.pid   = problem._id
    else
      query.pid = null
  }


  const pageSize = subList_pageSize; //一页的题目数量

  let docs = await Cache.get(`subList-${page}-${JSON.stringify(query)}`,()=>{
      return db.model['sub'].find(query).select("-code -result_list").sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize)
    .populate("uid","email username realname")
    .populate("pid","title pid").then( docs => docs.map(doc => doc.toJSON({virtuals: true})) )
  })


  let count = await Cache.get(`subList-totalsize-${JSON.stringify(query)}`,()=>{
    return db.model['sub'].find(query).countDocuments()
  })
  //debug(docs)

  ctx.renderData = {
    ...ctx.renderData,
    subs:docs,
    pagenation:pageNation(page,count,pageSize),
    queryUrl,
    query:raw_query
  }

  await next()
}
