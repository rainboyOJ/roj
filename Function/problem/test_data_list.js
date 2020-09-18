//得到测试数据列表

const fs = require("fs")
const pathFn = require("path")

const {data_list,fileList} = require("../../utils")
const {debug} = require("console")
const Cache = require("../../lib/Cache")
const _ = require("lodash")

module.exports = async function test_data_list(ctx,next){
  let PID = ctx.params.pid || ctx.PID
  //检查数据是否存在
  let data_path = pathFn.join(CONFIG.DATA_PATH,PID+"")

  try {
    await fs.promises.access(data_path)
  }
  catch(e){
    ctx.body = "数据目录不存在，请检查！"
    return;
  }

  //得到每个文件的大小
  function file_size_format(size){
    if( size < 1024 ) return `${size} B`; // byte
    if( size < (1<<20) ) return `${(size/1024).toFixed(2)} KB`; // Kb
    if( size < (1<<30) ) return `${(size/(1<<20)).toFixed(2)} MB`; // Mb
    return `${(size/(1<<30)).toFixed(2)} GB`
  }

  //得到数据列表全部的信息
  let List = await Cache.get(`data_list_${PID}_info`,()=>{
      return fileList(data_path)
              .then( (flist) => {
                return Promise.all(
                  flist.map( file => fs.promises.stat(pathFn.join(data_path,file)).then( d => [file,file_size_format(d.size)]))
                )
              })
              .then( (flist_with_size)=>{
                return {
                  flist_with_size,
                  data_list: data_list(_.unzip(flist_with_size)[0]).both_list
                }
              })
  },20)

  //let dlist = data_list(flist)


  ctx.renderData = {
    ...ctx.renderData,
    pid:PID,
    ...List
  }
  //debug(ctx.renderData)
  await next()
}
