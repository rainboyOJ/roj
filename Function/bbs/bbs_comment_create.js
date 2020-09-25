//创建评论
const {momentCN,email2avatar}  = require("../../utils/index")
const markdown  = require("../../markdown-r/index")
module.exports = async function bbs_comment_create(ctx,next){
    let {content,tid} = ctx.request.body
    let doc = await db.model['reply'].create({content,tid,uid:ctx.session._id})
    doc = await doc.populate("uid","username realname email email").execPopulate()
    doc = doc.toJSON({virtuals:true})
    doc.uid.avatar = email2avatar(doc.uid.email,CONFIG)
    doc.html_content= markdown.render(doc.content)

    db.model['topic'].findOneAndUpdate({_id:tid},{last_reply_at:Date.now()}).exec()
  
    ctx.body = {
      status:0,
      message:"创建评论成功",
      doc
    }
}
