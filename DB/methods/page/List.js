/*!
 * 
 * {
 *      model: 名字
 *      query: 查询的条件,
 *      select: { get:1,drop:0} 选择需要的field
 *      opts:
 *          - sort
 *          - skip
 *          - limit
 *      populates: []
 *      [
 *      {
 *          path: 'fans',
 *          match: { age: { $gte: 21 }},
 *               // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
 *          select: 'name -_id',
 *      }]
 * }
 * @author rainboy
 */
module.exports = function({model,query,select={},opts,populates=[]}){
    let find = this.model[model].find(query,select,opts)
    for(let populate of populates)
        find=find.populate(populate)
    return find
}
