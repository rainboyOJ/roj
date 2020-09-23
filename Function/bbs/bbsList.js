const {bbsList_pageSize} = require("../../lib/DEFINE")
const { pageNation } = require("../../utils/index")
const Cache = require("../../lib/Cache")
const { BBS_CONFIG } = require("../../lib/DEFINE")

module.exports = async function bbsList(ctx,next){
  let page = parseInt(ctx.query.page || 1)
  let tab  = ctx.query.tab || 'blow'    //默认吹水
  if ( !BBS_CONFIG.tabs.includes(tab) ){ //不包含这个tab分类
    ctx.redirect("/404")
    return
  }

  const pageSize = bbsList_pageSize; //一页的题目数量,40

  //其它的查询参数
  let extra = {}
  let pid = parseInt(ctx.query.pid)
  if(!isNaN(pid)) {
    let problem = await db.GetOneProblem(pid)
    extra.pid = problem._id
  }


  let docs = await Cache.get(`bbsList-${tab}-${page}` ,()=>{
    return db.model['topic'].find({
      is_del:false,
      tab,
      ...extra
    })
      .select("-content")
      .sort({top:1,last_reply_at:-1})
      .skip((page-1)*pageSize)
      .limit(pageSize)
      .populate("uid","email realname username")
      .populate("pid","pid title")
      .then( docs => docs.map(doc => doc.toJSON({virtuals:true})))
  })

  let docs_count = await Cache.get(`problemList-total-size`,()=>{
    return db.model['topic'].find({is_del:false,tab}).countDocuments();
  })

  ctx.renderData = {
    ...ctx.renderData,
    topics:docs,
    pagenation:pageNation(page,docs_count,pageSize),
    tab:tab,         //哪个分类
    tabName: BBS_CONFIG.name[tab] || '未知'
  }

  await next()
}
