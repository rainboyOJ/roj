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


  ctx.renderData = {
    ...ctx.renderData,
    problem:{
      ...doc,
      html_content:markdown.render(doc.content)
    }
  }

  await next()
}
