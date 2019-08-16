const fs = require("fs")
const pathFn = require("path")
const yaml = require('js-yaml')

const config_path = [
    `${__project}/config.yaml`,
    `${__project}/default_config.yaml`
]
module.exports = function(){
    for( let file of config_path){
        try {
            let config = yaml.safeLoad( fs.readFileSync(file,'utf8'))
            console.log(`加载配置成功: ${file}`)
            return config
        }
        catch(e){
            console.log(`加载配置失败: ${file}`)
        }
    }
    console.error('========= 没有配置被加载,程序退出! =========')
    process.exit(1)
}
