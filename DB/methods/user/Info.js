/*!
 * 得到一个用户的信息
 */
module.exports = async function userInfo(
    _id,                // doc _id
    normal_user= true,  // 普通用户 还是admin
    force=false         // 
){
    let query = {
        model: normal_user ? 'user' : 'admin',
        query: force ?  {_id}           : {_id,is_del:false},
                        /* 强制获取 */
        populates:[
            { path:'posted', select:"title" },
            { path:'passed', select:"title" },
        ]
    }

    let doc = await this.oneGet(query)
    if( doc )
        return doc.toObject()
    else
        return null
}
