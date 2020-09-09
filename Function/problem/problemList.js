//得到problem的数据进行ctx.renderData
const fs = require("fs");
const {debug} = require("console");
const {problemList_pageSize} = require("../../lib/DEFINE")
const { pageNation } = require("../../utils/index")
const Cache = require("../../lib/Cache")

module.exports = async function problemList(ctx,next){
  let page = parseInt(ctx.query.page || 1)
  const pageSize = problemList_pageSize; //一页的题目数量,50
  //let doc = await db.oneGet({model:'problem',query:{pid}})
  let docs = await Cache.get(`problemList-page-${page}` ,()=>{
    return db.model['problem'].find({is_del:false}).select("-content").sort({pid:1}).skip((page-1)*pageSize).limit(pageSize)
  })

  //用户通过的题目
  let {posted,passed} = await Cache.get(`user-${ctx.session._id}`,()=>{
    return db.model['user'].findOne({_id:ctx.session._id}).then( doc => doc.toJSON({virtuals:true}))
  })

  //有可能取出的数据里 是Object 类型，所以都转成string
  if(posted.length && typeof(passed[0]) != 'string'){
    posted = posted.map( d => d.toString())
    passed = passed.map( d => d.toString())
  }

  //未做过=0 未通过=1 通过 = 2
  let problems = docs.map( (p) => {
    let string_id = p._id.toString() // 都转成string，类型一致，可以查找
    if( passed.includes(string_id) )
      p.sub_status = 2;
    else if ( posted.includes(string_id) )
      p.sub_status = 1;
    else p.sub_status = 0;
    return p
  })

  let docs_count = await Cache.get(`problemList-total-size`,()=>{
    return db.model['problem'].find({is_del:false}).countDocuments();
  })

  ctx.renderData = {
    ...ctx.renderData,
    problems,
    pagenation:pageNation(page,docs_count,pageSize)
  }

  await next()
}
