//得到评论
const markdown = require("../../markdown-r/index")
const Cache    = require("../../lib/Cache")
const { pageNation ,email2avatar} = require("../../utils/index")
module.exports = async function getReply(ctx,next){
  let tid = ctx.params.tid
  let page = parseInt(ctx.params.page) || 1
  let pageSize = 10


  let docs = await Cache.get(`reply-${tid}-${page}`, ()=>{
    return db.model['reply'].find({tid,is_del:false})
      .skip((page-1)*pageSize)
      .limit(pageSize)
      .populate("uid","email realname username")
      .then( docs => { 
        return docs.map( doc => doc.toJSON({virtuals:true})) 
      })
      .then( docs=> {
        return docs.map( doc => {
          doc.uid.avatar = email2avatar(doc.uid.email,CONFIG)
          return {
            ...doc,
            html_content:markdown.render(doc.content)
          }
        })
      })
  })

  let docs_count = await Cache.get(`reply-${tid}-${page}-size`,()=>{
    return db.model['reply'].find({tid,is_del:false}).countDocuments();
  })

  //ctx.renderData = {
    //...ctx.renderData,
    //replies: docs
  //}

  ctx.body = {
    status:0,
    message:"ok",
    replies:docs,
    total_replies:docs_count,
    pagenation:pageNation(page,docs_count,pageSize)
  }
}
