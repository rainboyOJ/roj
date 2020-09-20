//题目更新
const Joi = require('joi')
const {unlinkSync,mkdirSync,existsSync,rmdirSync,renameSync,copyFileSync} = require("fs")
const pathFn = require("path")
const {execSync} = require("child_process")
const {createDbTextSearch} = require("../../utils")


const schema = Joi.object({
    pid: Joi.number()
        .integer()
        .min(1)
        .max(1000000)
        .required()
    ,time: Joi.number()
        .integer()
        .min(100)      //最小 100ms
        .max(50000)    //最大 50s
        .optional()    //可选的
    ,memory: Joi.number()
        .integer()
        .min(16)      //最小16mb
        .max(4*1024)  //最大4GB
        .optional() 
    ,stack: Joi.number()
        .integer()
        .min(15)      //最小16mb
        .max(4*1024)  //最大4GB
        .optional() //默认128mb
    ,level: Joi.number()
        .integer()
        .min(1)      //最小16mb
        .max(10)  //最大4GB
        .optional() //默认128mb
    ,title:Joi.string()
        .min(1)     
        .max(100)  
        .optional() 
    ,content:Joi.string()
        .optional()
    ,spj: Joi.string()
        .valid(...['INNER','default','spj.cpp','spj.js','spj.py', "acmp","caseicmp","casewcmp","fcmp", "hcmp","lcmp","rcmp", "rcmp6","rncmp","wcmp", "bcmp","casencmp","dcmp","fcmp2","icmp","ncmp","rcmp4","rcmp9","uncmp","yesno" ])
        .optional()
    ,is_del:Joi.boolean()
        .optional()
    ,source:Joi.string().allow('').optional()
})

module.exports = async function problem_update(ctx,next){
  //1.查检参数
  let {pid,time,memory,stack,spj,level,title,content,source} = ctx.request.body
  const { error, value } = schema.validate({pid,time,memory,stack,spj,level,title,content,source});
  if( error){
    ctx.body = {
      status:-1,
      message: String(error)
    }
    return
  }

  //1.1 题目的存在性
  let prob = await db.model['problem'].findOne({pid:value.pid})

  if( !prob ){
    ctx.body = {
      status:-1,
      message:`Pid: ${value.pid} 的题目不存在！`
    }
    return 
  }

  //2.处理数据文件
  if(ctx.request.files && ctx.request.files.file){ //上传了文件
    let file = ctx.request.files.file
    let data_path = pathFn.join(CONFIG.DATA_PATH,pid+'')
    let data_path_exists = existsSync(data_path)
    //debug(file.path)
    if( data_path_exists ){  //数据目录存在
      if( ctx.request.body.upload_force){ //强制上传数据
        rmdirSync(data_path,{recursive:true})
      }
      else {
        ctx.body = {
          status:-1,
          message:`对应pid : ${pid} 的数据已经存,可以选择强制上传,覆盖数据与题目`
        }
        return
      }
    }
    //创建目录
    mkdirSync(data_path,{recursive:true})
    try{
      execSync(`unzip -o -j -d ${data_path} ${file.path} `)
    }
    catch(e){
      rmdirSync(data_path,{recursive:true})
      ctx.body = {
        status:-1,
        message:"在解压的过程中发生错误,请检查数据文件的格式"
      }
      return
    }
    //把上传的文件移动到data_path_zip 目录
    
    copyFileSync(file.path,pathFn.join(CONFIG.DATA_PATH_ZIP,`${pid}.zip`))
    unlinkSync(file.path) //删除上传的文件
  }

  //3.创建/更新题目
  //if( value.title ){ //如果有title 存在
    //extra_update.search = [value.pid+"",...createDbTextSearch(value.title)].join(" ")
  //}
  let doc = await db.model['problem'].findOneAndUpdate({pid},value)
  ctx.body = {
    status:0,
    message:`更新题目:${pid} 成功!`
  }

}
