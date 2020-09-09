//得到problem的数据进行ctx.renderData
const markdown = require("../../markdown-r")
//const fs = require("fs")
module.exports = async function problem_show(ctx,next){
  let pid = parseInt(ctx.params.pid || 1000)
  let doc = await db.oneGet({model:'problem',query:{pid}})
  if( !doc){
    ctx.redirect("/404")
    return
  }
  ctx.renderData = {
    ...ctx.renderData,
    problem:{
      ...doc.toJSON(),
      html_content:markdown.render(doc.content)
    }
  }
  //debug(ctx.renderData.problem.html_content)
  //fs.writeFileSync("/home/rainboy/tmp/1.html",ctx.renderData.problem.html_content ,{encoding:'utf-8'})


  await next()
}
