//分割 DB的search 键，为后面的查找
const jieba = require("nodejieba")
module.exports = function createDbTextSearch(str){
  let only_en = str.replace(/[^a-zA-Z]/g," ").split(" ").filter(d => d.length)
  let only_num = str.replace(/[^0-9]/g," ").split(" ").filter(d => d.length)
  let only_chn = jieba.cut( str.replace(/[^\u4e00-\u9fa5]/g,""))

  return [...only_chn,...only_en,...only_num]
}
