module.exports = async function search(ctx,next){
    let {search }=  ctx.request.body
    let problems = await db.model['problem'].find({$text:{ $search:search } })
  debug(problems)
    ctx.body = {
      status: 0,
      problems
    }
}
