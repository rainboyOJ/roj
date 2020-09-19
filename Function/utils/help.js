const fs = require("fs")
const markdown = require("../../markdown-r")

const help_content = markdown.render(
  fs.readFileSync(__project+'/help.md','utf8')
)
module.exports = async function help(ctx,next){
    ctx.renderData = {
      ...ctx.renderData,
      help_content
    }
  await next()
}
