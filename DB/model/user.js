const mongoose = require("mongoose")
const Schema = mongoose.Schema;
//const md5 = require("md5")
//const getLevel = require("./_libs/getLevel.js")

var _Schema  = new Schema({
    realname:String,
    username:{type:String,unique:true},
    password:String,      //不存password,都在存在loginserver
    email:{type:String,unique:true},
    create_at:{type:Date,default:Date.now}, //加入的时间
    update_at: { type: Date, default: Date.now },

    avatar:String,

    posted:{type:Array,default:[],ref:'problem'}, //提交的题目id
    passed:{type:Array,default:[],ref:"problem"},  //通过的题目
    
    postedCount:{type:Number,default:0},    //提交的次数
    passedCount:{type:Number,default:0},    //通过的次数
    retire:{type:Boolean,default:false},           //是否退役
    intro:{type:String,default:'这个人很懒,什么也没有留下'},

    point:{type:Number,default:0},   //积分
    topic_count: { type: Number, default: 0 },          // 创建的topic的数量
    reply_count: { type: Number, default: 0 },          // 回复的数量
    follower_count: { type: Number, default: 0 },       // 追随的数量
    following_count: { type: Number, default: 0 },      // 追随别人的数量
    collect_topic_count: { type: Number, default: 0 },  // 收藏的topic数量

    rank:{type:Number,default :0},                       // 积分，做题目，比赛，发布题目解析，等得到理解

    is_del:{type:Boolean,default:false} //是否删除
})




//const default_avatar = encodeURIComponent(global.C.default_avatar)

//_Schema.virtual("avatar").get(function(){
    //let email = this.email || ''
    //let _md5 = md5(email.trim().toLowerCase())
    //let base = global.C.avatar_base || "https://www.gravatar.com/avatar/"
    //return `${base}${_md5}?d=${default_avatar}`
//})
/* 等级 ,根据rank分得到 */
//_Schema.virtual("level").get(function(){
    //return getLevel( this.rank)
//})

/* 通过比率 */
_Schema.virtual("postRate").get(function(){
    if( !this.postedCount || !this.passedCount)
        return '0.00%'
    return (this.passedCount / this.postedCount).toFixed(4)*100+ '%'
})

_Schema.pre('save', function(next){
  var now = new Date();
  this.update_at = now;
  next();
});

_Schema.index({username: 1});
_Schema.index({email: 1});
_Schema.index({point: -1});

//_Schema.set('toJSON', { getters: true, virtuals: true});
_Schema.set('toObject', { virtuals: true } )
_Schema.set('toJSON', { virtuals: true } )


module.exports = _Schema
