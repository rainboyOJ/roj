var Schema = require("mongoose").Schema
var moment = require("moment")
const voucher_codes = require("voucher-code-generator")

function somedayLater(){
    return moment().add(3, 'd').toDate();
}
function generator(){
    return voucher_codes.generate({
        length:5
    })[0]
}


var inviteSchema = new Schema({
    expireAt:{type:Date,default:somedayLater},
    inviteCode:{type:String,default:generator},
    used:{type:Boolean,default:false},
});

//是否过期
inviteSchema.virtual('expire').get(function(){
    return !moment().isBefore(this.expireAt); // true
})
inviteSchema.index({inviteCode: 1});
inviteSchema.set('toObject', { virtuals: true } )

module.exports = inviteSchema
