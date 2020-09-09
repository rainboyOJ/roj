/* 
 * 创建 邀请码
 * */
const moment = require("moment")
module.exports = async function inviteCode_list_data(ctx,next){

    debug(ctx.query)
    let {page,limit} = ctx.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10
    skip = (page-1) *limit
    //let docs = await db.model['invite'].find({}).sort({_id:-1})
    let docs = await db.pageList({
        model:'invite',
        query:{},
        opts:{
            sort:"-_id",
            skip,
            limit
        }
    })
    let count = await db.pageList({model:'invite',query:{}}).count()
    let _docs = docs.map( (d)=> { return d.toObject()})
    //debug(_docs)
    ctx.body = {
        code: 0,
        status: 0,
        msg:"ok",
        count:count,
        data: _docs
    }
    
}
