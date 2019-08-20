/* 创建SuperAdmin ,这个只能由,系统根据config来创建*/
module.exports = function({
    username,
    password,
    avatar,
}){
     return this.model['admin'].findOne({access:'super_admin'}).then((doc)=>{
         if( doc !== null){
             //return { status:-1,message:''}
             console.error(' ==●﹏●==: 只能有一个超级管理员!')
             return
         }
         return this.model['admin'].create({
             username,
             password:password_salt(password),
             access:'super_admin',
             avatar
         })
     })
}
