/* 
 * 创建 邀请码
 * */
const moment = require("moment")
module.exports = async function inviteCode_create(ctx,next){
    let {number,expireAt} = ctx.request.body
    debug(number,expireAt)

    number = parseInt(number)
    expireAt = moment().add(parseInt(expireAt),'d').toDate()

    let docs = []
    for( let i = 0 ;i< parseInt(number); i++){
        docs.push({expireAt})
    }

    let create_docs = await db.model['invite'].create(docs)
    
    if( create_docs){
        ctx.body = {
            status:0,
            message:`创建 ${create_docs.length} 条邀请码成功!`
        }
    }
    else
        ctx.body = {
            status:-1,
            message:"创建失败!"
        }
}
