//常用的宏

const judge = require("./judge")


//返回结果的中的result的含义
const JUDGE  = {
  COMPILE_ERROR:'compile_error',
  OTHER_ERROR:-1,
  COMPILE_SPJ_ERROR:'compile_spj_error',
  SUCCESS:0
}
exports.JUDGE = JUDGE

exports.JUDGE_RESULT_MAP_STEP = {
  [JUDGE.SUCCESS]           : 0,
  [JUDGE.COMPILE_ERROR]     : 1,
  [JUDGE.COMPILE_SPJ_ERROR] : 2,
  [JUDGE.OTHER_ERROR]       : 3
}

//结果列表里的result的含义
exports.RESULT_LIST_MEAN = {
"-1" :"答案错误"               ,
"0" :"正确"                    ,
"1" :"cpu_time_limit 时间超时" ,
"2" :"real_time 超时"          ,
"3" :"内存超限制"              ,
"4" :"运行时错误"              ,
"5" :"系统错误"                ,
"6" :"spj运行时错误"           
}

