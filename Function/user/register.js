
/* 用户注册
 * realname
 * username
 * password
 * email
 * intro
 * inviteCode
 *
 * */
module.exports = async function register(ctx,next){
  let {realname,username,password,email,intro,inviteCode} = ctx.request.body
  debug(JSON.stringify({realname,username,password,email,intro,inviteCode},null,4))
  //邀请码检验
  let invicode_doc = await db.oneGet({model:'invite',query:{inviteCode}})
  if(!invicode_doc || invicode_doc.used){
    ctx.body = {
      ...ctx.should_ret,
      status:-1,
      message:`邀请码: ${inviteCode} 不正确或已经使用`
    }
    return
  }

  ////同名用户检查
  let user_doc = await db.oneGet({model:'user',query:{username}})
  if( user_doc ){
    ctx.body = {
      ...ctx.should_ret,
      status:-1,
      message:`用户名: ${username} 已经被使用`
    }
    return
  }
  //注册
  try{
    await db.model['user'].create({
      realname,username,email,intro,
      password:password_salt(password),
    })
  } catch(e){
    ctx.body = {
      ... ctx.should_ret,
      status:-1,
      message:"邮箱已经被使用了"
    }
  }

  //设置邀请码为使用
  await db.oneUpdate({model:'invite',query:{_id:invicode_doc._id},update:{used:true}})

  ctx.body = {
    ... ctx.should_ret,
    status:0,
    message:"注册成功"
  }
}
