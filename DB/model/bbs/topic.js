/*!
 * 话题,topic
 * @author rainboy
 */

var mongoose  = require('mongoose');
var BaseModel = require("../_base");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var _         = require('lodash');
const {momentCN}= require("../../../utils/index")
const { BBS_CONFIG }     = require("../../../lib/DEFINE")

var TopicSchema = new Schema({
  title: { type: String },              //标题
  content: { type: String },            //内容
  tab: {type: String,enum:BBS_CONFIG.tabs },      // 哪个类型

  uid: { type: ObjectId ,ref:'user'},//作者
  pid:{type:ObjectId,ref:'problem'}, //当一个话题是题目的解析,就会有这个关联项目

  top: { type: Boolean, default: false }, // 置顶帖
  good: {type: Boolean, default: false}, // 精华帖
  lock: {type: Boolean, default: false}, // 被锁定主题

  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  last_reply: { type: ObjectId ,ref:'user'},
  last_reply_at: { type: Date, default: Date.now },

  ups:[{type:ObjectId,ref:'user'}],  //点赞的人
  ups_count:{type:Number,default:0}, //点赞的数量

  is_del: {type: Boolean, default: false}, //是不是被删除了

});


TopicSchema.index({tab:1})
TopicSchema.index({refProblem: 1});

TopicSchema.index({create_at: -1});
TopicSchema.index({top: -1, last_reply_at: -1});
TopicSchema.index({uid: 1});
//TopicSchema.index({uid: 1, create_at: -1});
TopicSchema.index({is_del:1});

TopicSchema.plugin(BaseModel);

TopicSchema.virtual('last_reply_at_human').get(function(){
  return this.last_reply_at ? momentCN(this.last_reply_at).fromNow() : null;
})


TopicSchema.set('toJSON', { virtuals: true } )

module.exports = TopicSchema
