const send = require('koa-send');
const fs = require("fs")
const pathFn = require("path")
const {exec} = require("child_process")

//文件是否存在
async function exists(path){
    try {
      await fs.promises.access(path) //文件存在
      return true
    }
    catch(e){
      return false
    }
}

function execShellCommand(cmd) {
 return new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
    if( error) reject(eror)
    else resolve()
  });
 });
}


module.exports = async function test_data_download(ctx,next){
  if(ctx.params.file){ //指定下载某个文件
    let file_path = pathFn.join(CONFIG.DATA_PATH,ctx.params.pid,ctx.params.file)
    let file_exists = await exists(file_path)

    if( file_exists ){
      await fs.promises.access(file_path) //文件存在
      ctx.attachment(ctx.params.file);
      await send(ctx,ctx.params.file,{root:pathFn.dirname(file_path)})
    }
    else {
      ctx.status = 404
      ctx.body = "file do not exists!"
    }

  }
  else { //打包下载
    let data_path = pathFn.join(CONFIG.DATA_PATH,ctx.params.pid)
    let data_path_zip = pathFn.join(CONFIG.DATA_PATH_ZIP,`${ctx.params.pid}.zip`)
    if( await exists(data_path) ){ //数据目录存在
      if( !await exists(data_path_zip)){ //打包的zip不存在
        await execShellCommand(`zip -j -r ${data_path_zip} ${data_path} `) //打包
      }
      ctx.attachment(pathFn.basename(data_path_zip));
      await send(ctx,pathFn.basename(data_path_zip),{root:pathFn.dirname(data_path_zip)})
    }
    else {
      ctx.status = 404
      ctx.body = "data do not exists!"
    }

  }
}
