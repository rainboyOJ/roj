//通过post来请求bbs的相关
// query
// {
//  tab
//  is_del
//  pageSize
//  page
//  pid
//  uid
// }
const {momentCN,email2avatar}  = require("../../utils/index")
const {bbsList_pageSize} = require("../../lib/DEFINE")
const { pageNation } = require("../../utils/index")
const Cache = require("../../lib/Cache")
const { BBS_CONFIG } = require("../../lib/DEFINE")

module.exports = async function bbsList_api(ctx,next){
  let query= ctx.request.body

  let {page=1,tab='blow',pageSize=10,is_del=false} = query

  if ( !BBS_CONFIG.tabs.includes(tab) ){ //不包含这个tab分类
    ctx.redirect("/404")
    return
  }

  //其它的查询参数
  let extra = {}
  let {pid}=  query
  if(pid) {         //这个参数只能由 query得到
    let problem = await db.GetOneProblem(pid)
    extra.pid = problem._id
  }
  if( query.uid ) extra.uid = query.uid


  let QUERY = { is_del, tab, ...extra }
  if( query.ignore_is_del ){
    delete QUERY.is_del
  }

  let docs = await Cache.get(`bbsList-${JSON.stringify(query)}` ,()=>{
    return db.model['topic'].find(QUERY)
      .select("-content")
      .sort({top:1,last_reply_at:-1})
      .skip((page-1)*pageSize)
      .limit(pageSize)
      .populate("uid","email realname username")
      .populate("pid","pid title")
      .then( docs => docs.map(doc => doc.toJSON({virtuals:true})))
  })

  let docs_count = await Cache.get(`bbsList-total-size-${JSON.stringify(query)}`,()=>{
    return db.model['topic'].find(QUERY).countDocuments();
  })

    ctx.body = {
      status:0,
      message:'ok',
      topics: docs,//docs.map( doc => {doc.uid.avatar = email2avatar(doc.uid.email,CONFIG);return doc}),
      pagenation:pageNation(page,docs_count,pageSize),
      tab:tab,         //哪个分类
      tabName: BBS_CONFIG.name[tab] || '未知'
    }
}
