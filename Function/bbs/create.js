//发贴帖子
module.exports = async function create(ctx,next){
    let {title,pid,content} = ctx.request.body
    let create_doc = {title,content,tab:'blow',uid:ctx.session._id}

    if(pid){ //如果题目编号存在,就是题目的解析
      create_doc = {
        ...create_doc,
        pid:pid,
        tab:'problem'
      }
    }
    let doc = await db.model['topic'].create(create_doc)
    ctx.body  = {
      status:0,
      message:'创建贴子成功',
      _id : doc._id
    }
}
