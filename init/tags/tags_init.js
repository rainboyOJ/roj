/* 这里是默认的tags
 * */

exports.message = "初始化tags"


.exports =  function({_id,content}){
    return this.model['tag'].updateOne({
        _id:_id
    },{
        $setOnInsert:{_id,content}
    },{
        upsert:true
    })
}

exports.init = async function(){
    let tags = U.yaml(__dirname+'/tags.yml')
    for( let tag of tags)
        await DB.tagCreateIfExists(tag)
}
