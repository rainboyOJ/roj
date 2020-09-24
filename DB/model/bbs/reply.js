//回复
var mongoose  = require('mongoose');
var BaseModel = require("../_base.js");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
const {momentCN}= require("../../../utils/index")

var ReplySchema = new Schema({
    content: { type: String },
    tid:{type:ObjectId,require:true,ref:'topic'},   //关联的topic
    uid:{ type: ObjectId ,ref:'user'},
    reply_id: { type: ObjectId ,ref:'reply'}, //关联的回复id
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    ups: [{type:ObjectId,ref:'user'}],       //点的人
    ups_count: {type:Number,default:0},      //点赞数
    is_del: {type: Boolean, default: false},
});

ReplySchema.index({tid: 1});
ReplySchema.index({uid: 1, create_at: -1});
ReplySchema.plugin(BaseModel);

module.exports = ReplySchema
