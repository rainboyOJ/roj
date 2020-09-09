/* 提交记录 */
const moment = require("moment")
var Schema = require("mongoose").Schema
const ObjectId = Schema.Types.ObjectId;
const DEFINE = require("../../lib/DEFINE") 
const BaseModel = require("./_base.js")

var submissionSchema = new Schema({
    pid:{type:ObjectId,ref:'problem'}, //测评的题目的编号
    uid:{type:ObjectId,ref:'user'},    //测评的用户

/*
 *    type:{type:Number,default:0}, //提交的类型,0普通题目,1:比赛,2:battle,3:task,4:random
 *    ref:{type:ObjectId,require:true,refPath:'refModel'},         //关联的battle,contest,
 *    refModel:{
 *        type:String,
 *        require:true,
 *        enum:['problem','contest','task','random','battle'],
 *        default:'problem'
 *    },
 *    team:{type:ObjectId,ref:'team'}, //如果是团队提交,关联team
 *
 *    shortid:Number,     //比赛中的提交的时间，在比赛中的第几个题目的提交
 */

    //比赛的提交 单独形成一个sub 集合

    create_at:{type:Date,default:Date.now},//创建时间
    update_at:{type:Date,default:Date.now}, //更新,评测结束的时间

    lang:String, //语言
    code:String, //代码
    auto_io:Boolean, //是否是auto_io


    result:[], //结果
    error:String, //如果评测的过程,发生了错误,存错误的原因
    //step:{type:Number,default:-1},//看 DEFINE.js 中
    status:{type:String,default:DEFINE.JUDGING},
    //short_result:String, //短的字符串

    total_memory:{type:Number,default:0}, //占用的总内存 byte
    total_time:{type:Number,default:0}, // 总时间, ms

    score:{type:[Number,Number],default:[0,0]}, // 通过, 全部点的数量
    is_del:{type:Boolean,default:false} //是否删除,可用于比赛的提交

});

submissionSchema.plugin(BaseModel)

//submissionSchema.index({create_at:-1})
//submissionSchema.index({ref:1})
//submissionSchema.index({type:1})

//submissionSchema.virtual("status").get( function(){
    //if( this.step == 0) {
      //for( let {result} of this.result )
        //if( result !=0 ) return DEFINE.RESULT_LIST_MEAN[result]
      //return this.DEFINE.RESULT_LIST_MEAN[0]
    //}
    //return DEFINE.STEP_MAP_DESC[this.step]
//})
submissionSchema.virtual("short_result").get( function(){
  return this.result.map( ({result})=> { return DEFINE.RESULT_LIST_SHORT_MEAN[result]})
})

submissionSchema.virtual("create_at_format").get(function(){
  return moment(this.create_at).format("YYYY-MM-DD HH:mm:ss")
})
//submissionSchema.virtual("total_memory").get(function(){
  //return this.result.reduce((tot,{memory})=>tot+memory,0)
//})

//submissionSchema.virtual("total_time").get(function(){
  //return this.result.reduce((tot,{cpu_time})=>tot+cpu_time,0)
//})

module.exports = submissionSchema
