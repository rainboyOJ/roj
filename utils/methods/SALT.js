var crypto = require("crypto")

module.exports =  function(password,salt){
    var hash = crypto.createHmac('sha256',salt)
    hash.update(password)
    var value = hash.digest('hex')
    return {
        salt,
        password:value
    }
}
//var a = sha512('rainboy','helo')
//console.log(a)
