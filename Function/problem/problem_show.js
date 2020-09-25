//得到problem的数据进行ctx.renderData
const markdown = require("../../markdown-r")
const Cache = require("../../lib/Cache")
//const fs = require("fs")
module.exports = async function problem_show(ctx,next){
  let pid = parseInt(ctx.params.pid || 1000)

  if( isNaN(pid) ) { //不正确的pid
    ctx.redirect("/404")
    return;
  }

  let doc = await db.GetOneProblem(pid)

  if( !doc){
    ctx.redirect("/404")
    return
  }

  let html_content = await Cache.get(`problem-${pid}-html_content`,()=>{
    return markdown.render(doc.content || '题目无内容')
  })


  ctx.renderData = {
    ...ctx.renderData,
    problem:{
      ...doc,
      html_content
    }
  }
  await next()
}
