const Problem_search = require('../../lib/Problem_search')

module.exports = async function search(ctx,next){
    let {search }=  ctx.request.body
    let problems = Problem_search.search(search)
    debug(problems)
    ctx.body = {
      status: 0,
      problems
    }
}
