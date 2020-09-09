const fs = require("fs")
const pathFn = require("path")


/** 
 * 得到路径读取文件,返回文件列表 
 * 会过滤文件夹,
 * */

const fileList = function (filePath){
  //let fl = fs.readdirSync(filePath)

  return fs.promises.readdir(filePath).then( (fl)=>{
                      //d:string[],f:string
    return fl.reduce( (d,f)=>{
      let stat = fs.statSync( pathFn.join(filePath,f));

      if( stat.isFile()) d.push(f)

      return d;

    },[])
  })

}
module.exports =  fileList
