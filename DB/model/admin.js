/* 
 *  应该有一个默认的bot 机器人管理员,它用来进行自动加减分
 * */
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var _Schema  = new Schema({
    username:{type:String,unique:true},
    password:String,
    avatar:String,
    create_at:{type:Date,default:Date.now}, //加入的时间
    update_at: { type: Date, default: Date.now },
    is_del:{type:Boolean,default:false}, //是否删除
    access:{type:String,default:'admin', enum:['super_admin','admin']},// super_admin,admin
})


_Schema.index({username: 1});
_Schema.index({email: 1});

_Schema.set('toJSON', { getters: true, virtuals: true});


module.exports = _Schema
