const utils = require('../utils')
const mongoose = require("mongoose")
const pathFn = require('path')

class DB {
    constructor(addr,opts={}){

        mongoose.connect(addr,opts)
        this.connection = mongoose.connection

        this.connection.once('open',()=>{
            console.log("=======: 数据库打开成功")
        })

        this.model = {}

        /* load model */
        let self = this
        utils.maps_2_deal( pathFn.join(__dirname,'model'),[/^_/],({full_path,basename,rpath})=>{
            self.model[basename] = mongoose.model(basename,require(full_path))
            console.info(`注册model成功,名字:${basename} 路径:${rpath}/${basename} `,__filename,__line)
        })
    }

}

DB.getInstance = function({addr,opts}){
    if(!DB.singleton){
        DB.singleton = new DB(addr,opts)
    }
    return DB.singleton
}

module.exports = DB


