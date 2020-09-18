
//修改用户信息
module.exports = async function change_info(ctx,next){
    let uid = ctx.session._id
    let {showEmail=false,intro} = ctx.request.body
    let doc = await db.model['user'].findOneAndUpdate({_id:uid},{showEmail,intro})
    ctx.body = {
      status : 0,
      message: "修改成功!"
    }
}
