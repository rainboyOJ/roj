
const Cache = require("../../lib/Cache")
const {isMongooseObjectId} = require("../../utils")
const markdown = require("../../markdown-r/index")

module.exports = async function bbsShow(ctx,next){
  let tid = ctx.params.id

  if( !isMongooseObjectId(tid)){ //不正确的id
    ctx.redirect("/404")
    return
  }

  let doc = await Cache.get(`topic-${tid}`, ()=>{
    return db.model['topic'].findOne({_id:tid,is_del:false}).populate("uid")
      .then(doc => doc.toJSON({virtuals:true}))
      .then( doc=> {
        doc.html_content = markdown.render(doc.content)
        return doc
      })
  })

  if( !doc ){
    ctx.redirect("/404")
    return
  }

  //更新浏览次数
  db.model['topic'].findOneAndUpdate({_id:tid},{ $inc:{visit_count:1} }).exec()


  let thumbs_uped = false
  for( let u of doc.ups ){
    if( u.toString() == ctx.session._id.toString()){
      thumbs_uped = true
      break;
    }
  }


  ctx.renderData = {
    ...ctx.renderData,
    topic: doc,
    user:doc.uid,
    thumbs_uped
  }

  await next()
}
