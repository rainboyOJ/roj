/* 提交记录 */
var Schema = require("mongoose").Schema
const ObjectId = Schema.Types.ObjectId;

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
    step:{type:Number,default:-1},//-1 评测中 0 评测正常且结束, 1 编译失败

    //total_memory:Number, //占用的总内存 kb 
    //total_time:Number, // 总时间, ms

    score:[Number,Number], // 通过, 全部点的数量
    is_del:{type:Boolean,default:false} //是否删除,可用于比赛的提交

});

submissionSchema.plugin(BaseModel)

//submissionSchema.index({create_at:-1})
//submissionSchema.index({ref:1})
//submissionSchema.index({type:1})

submissionSchema.virtual("status").get( function(){
    if(this.step === -1)
        return "评测中"
    if(this.step === 0)
        return "评测结束"
    if(this.step === 1 )
        return "编译失败"
    return "发生末知错误"
})

module.exports = submissionSchema
