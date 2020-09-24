const md5 = require("md5")
module.exports = function email2avatar(email,CONFIG){
    return CONFIG.AVATAR_CDN.replace('{md5}',md5(email))
}
