/* 
 * 删除 Doc 通过_id
 * */
module.exports = async function delDocByID(ctx,argument,next){


    let {_id} = ctx.request.body
    let {model,is_del} = argument

    if( is_del){
        await db.oneUpdate({
            model,
            query:{_id},
            update:{is_del:true}
        })
    }
    else
        await db.model[model].remove({_id})
    ctx.body = {
        status:0,
        message:"删除成功!"
    }
}
