/* 
 * 创建 邀请码
 * */
const moment = require("moment")
module.exports = async function inviteCode_create(ctx,next){
  debug(ctx.request.body)
    let {number,expireAt} = ctx.request.body
    debug(number,expireAt)

    number = number ? parseInt(number) : 1
    expireAt = expireAt ? parseInt(expireAt) : 3
    expireAt = moment().add(parseInt(expireAt),'d').toDate()

    let docs = Array(number).fill( {expireAt})
    debug("number",number)
    debug(docs)
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
