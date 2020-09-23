//回复
var mongoose  = require('mongoose');
var BaseModel = require("../_base.js");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var ReplySchema = new Schema({
    content: { type: String },
    ref:{type:ObjectId,require:true,ref:'topic'},   //关联的topic
    uid: { type: ObjectId ,ref:'user'},
    reply_id: { type: ObjectId ,ref:'reply'}, //关联的回复id
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    ups: [Schema.Types.ObjectId],       //点赞数
    is_del: {type: Boolean, default: false},
});

ReplySchema.plugin(BaseModel);
ReplySchema.index({ref: 1});
ReplySchema.index({uid: 1, create_at: -1});

module.exports = ReplySchema
