/*!
 * 更新一个文档
 * @author rainboy
 */

module.exports = function ({model,query={},update={}}){
    return this.model[model].updateOne(query,update)
}
