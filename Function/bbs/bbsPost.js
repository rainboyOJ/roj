module.exports = async function bbsPost(ctx,next){
  let pid = parseInt(ctx.params.id)
  let doc 
  if(!isNaN(pid)){ //如果pid存在,则说明要创建题目的讨论
    doc = await db.GetOneProblem(pid)
  }
  if( !doc ){
    ctx.redirect('/404')
    return
  }

  ctx.renderData = {
    ...ctx.renderData,
    problem:doc
  }

  await next()
}
