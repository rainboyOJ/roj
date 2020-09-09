//得到测试数据列表

const fs = require("fs")
const pathFn = require("path")

const {data_list,fileList} = require("../../utils")
const {debug} = require("console")

module.exports = async function test_data_list(ctx,next){
  //检查数据是否存在
  let data_path = pathFn.join(CONFIG.DATA_PATH,ctx.params.pid)

  try {
    await fs.promises.access(data_path)
  }
  catch(e){
    ctx.body = "数据目录不存在，请检查！"
    return;
  }
  let flist = await fileList(data_path)
  let dlist = data_list(flist)

  //得到每个文件的大小
  function file_size_format(size){
    if( size < 1024 ) return `${size} B`; // byte
    if( size < (1<<20) ) return `${(size/1024).toFixed(2)} KB`; // Kb
    if( size < (1<<30) ) return `${(size/(1<<20)).toFixed(2)} MB`; // Mb
    return `${(size/(1<<30)).toFixed(2)} GB`
  }
  let flist_with_size = await Promise.all( 
    flist.map( file => fs.promises.stat(pathFn.join(data_path,file)).then( d => [file,file_size_format(d.size)]))
  )

  ctx.renderData = {
    ...ctx.renderData,
    pid:ctx.params.pid,
    flist_with_size,
    data_list: dlist.both_list
  }
  debug(ctx.renderData)
  await next()
}
