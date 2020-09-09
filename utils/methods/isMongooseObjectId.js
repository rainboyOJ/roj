/* 测试字符串是否是mongoose ObjectId */

var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(str){
  return ObjectId.isValid(str); //true
}
