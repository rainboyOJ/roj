/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */

const moment = require("moment")
// 格式化时间
const formatDate = function (date, friendly) {
  date = moment(date);
  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

module.exports = function (schema) {
    schema.virtual('create_at_ago').get( function () {
        return formatDate(this.create_at, true);
    })

    schema.virtual('update_at_ago').get( function () {
        return formatDate(this.update_at, true);
    })

    schema.pre('save', function(next){
        var now = new Date();
        this.update_at = now;
        next();
    });

};

