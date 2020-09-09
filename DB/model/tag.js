
/* 标签 */
var Schema = require("mongoose").Schema
const BaseModel = require("./_base.js")
const ObjectId = Schema.Types.ObjectId;

var _Schema = new Schema({
    _id:String,//
    content:String,//说明
    //links:[{type:ObjectId,ref:'problem'}],//关联的题目
    creator:{type:String,ref:'user'},

    create_at:{type:Date,default:Date.now}, //加入的时间
    update_at: { type: Date, default: Date.now },

});

_Schema.index({create_at:1})

_Schema.plugin(BaseModel)

module.exports = _Schema;
