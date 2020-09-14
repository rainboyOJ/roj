/* 
 * 创建 邀请码
 * */
const moment = require("moment") 
const {unlinkSync,mkdirSync,existsSync,rmdirSync,renameSync,copyFileSync} = require("fs")
const pathFn = require("path")
const {execSync} = require("child_process")
const {join} = require('path')
const Joi = require('joi')
const {debug} = require("console")


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
        .default(1000) //默认 1s
    ,memory: Joi.number()
        .integer()
        .min(16)      //最小16mb
        .max(4*1024)  //最大4GB
        .default(128) //默认128mb
    ,stack: Joi.number()
        .integer()
        .min(15)      //最小16mb
        .max(4*1024)  //最大4GB
        .default(128) //默认128mb
    ,level: Joi.number()
        .integer()
        .min(1)      //最小16mb
        .max(10)  //最大4GB
        .default(1) //默认128mb
    ,title:Joi.string()
        .min(1)     
        .max(100)  
        .required() 
    ,content:Joi.string()
        .required() 
    ,spj: Joi.string()
        .valid('default')
    ,is_del:Joi.boolean()
        .default(false)
        //.valid(...['INNER','default','spj.cpp','spj.js','spj.py', "acmp","caseicmp","casewcmp","fcmp", "hcmp","lcmp","rcmp", "rcmp6","rncmp","wcmp", "bcmp","casencmp","dcmp",,,"fcmp2","icmp","ncmp","rcmp4","rcmp9","uncmp","yesno" ])
    ,source:Joi.string().allow('').optional()
})


module.exports = async function problem_create(ctx,next){
  //1.查检参数
  //debug(ctx.request.body)
  let {pid,time,memory,stack,spj,level,title,content,source} = ctx.request.body
  const { error, value } = schema.validate({pid,time,memory,stack,spj,level,title,content,source});
  if( error){
    ctx.body = {
      status:-1,
      message: String(error)
    }
    return
  }
  //2.处理数据文件
  if(ctx.request.files && ctx.request.files.file){ //上传了文件
    let file = ctx.request.files.file
    let data_path = join(CONFIG.DATA_PATH,pid+'')
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
  //debug(pid)
  //debug(value)
  let doc = await db.model['problem'].findOneAndUpdate({pid},value,{upsert:true})
  //console.log(doc)


  ctx.body = {
    status:0,
    message:`创建题目:${pid} 成功!`
  }
}
