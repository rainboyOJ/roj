/* 题目 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BaseModel = require("./_base.js")
const Problem_search = require("../../lib/Problem_search")

const _Schema = new Schema({

    pid:{type:Number,unique:true},
    title:String,
    content:String,
    time:{type:Number,default:1000},//限制的时间,ms
    memory:{type:Number,default:128*1024*1024},//限制的内存
    stack:{type:Number,default:128*1024*1024},//栈限制的内存
    spj:{type:String,default:'default'},//评测的
    source:String,//题目来源

    tags:[{type:String,ref:'tag'}], //标签

    //rank:{type:Number,default:100}, //
    level:{type:Number,default:1,max:10,min:1},//等级1-10,也是这个题目的积分
    posted:{type:Number,default:0},//通过的
    passed:{type:Number,default:0},//提交的

    creator:{type:ObjectId,ref:'user'},
    create_at:{type:Date,default:Date.now}, //加入的时间
    update_at: { type: Date, default: Date.now },

    "file_io_input_name": {type:String,default:"in"},
    "file_io_output_name": {type:String,default:"out"},

    //最佳提交
    bestSub:[{sid:ObjectId,create_at:Date,total_memory:Number,total_time:Number,uid:{type:ObjectId,ref:'user'}}],

    is_del:{type:Boolean,default:false}

});


_Schema.index({is_del:1})
_Schema.index({pid:1})
_Schema.plugin(BaseModel)

//难度
const LEVEL_2_HARD = [ "入门", "普级-", "普级", "提高-", "提高", "省选-", "省选", "NOI-", "NOI", "地狱"]
_Schema.virtual("hard").get( function(){
  return LEVEL_2_HARD[this.level-1]
})

//通过率
_Schema.virtual("passedRate").get( function(){
  if(!this.passed || !this.posted) return "0.00%"
  return (this.passed*100/ this.posted).toFixed(2)+ '%'
})

_Schema.pre('save',function(next){
  Problem_search.Debouce_init() //建立search的文档
  next()
})


module.exports = _Schema
