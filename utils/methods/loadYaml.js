/*!
 * 加载yaml文件
 * @author rainboy
 */

const fs = require("fs")
const pathFn = require("path")
const yaml = require('js-yaml')

module.exports = (yaml_path)=>{
    try {
        let config = yaml.safeLoad( fs.readFileSync(yaml_path,'utf8'))
        return config
    }
    catch(e){
        console.error(e)
        console.error(`${yaml_path} 加载失败,程序退出`)
        process.exit(1)
    }
}
