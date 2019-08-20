/* 
 * ●﹏● 进行初始化的工作
 * */

global.debug = require('debug')('debug')


/* 全局定义 __line */
// 来自 https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js
Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});

const utils = require("../utils")

    //== 加载配置
    global.CONFIG = utils.loadConfig()
    debug(JSON.stringify(CONFIG,null,4))


const DB = require('../DB')
global.db = DB.getInstance(CONFIG.MONGODB)

module.exports = async function INIT(koaApp){
}
