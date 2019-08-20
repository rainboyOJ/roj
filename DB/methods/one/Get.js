/*!
 * 得到一个文档
 * @author rainboy
 * let populates = [{
 *     path:'rankref',
 *     select:'rank level'
 * },{
 *     path:'uid',
 *     select:'avatar nickname'
 * }]
 *
 * oneGet( {
 *      model:'rank'
 *      query:{_id:'xxx'},
 *      populates,
 *      select:{
 *          '_id':1
 *      }
 * })
 */

module.exports = function ({model,query={},select={},populates=[]}){
    let find = this.model[model].findOne(query).select(select)
    for( let populate of populates){
        find = find.populate(populate)
    }
    return find
}
