//常用的宏

const judge = require("./judge")


//返回结果的中的result的含义
const JUDGE  = {
  COMPILE_ERROR:'compile_error',
  OTHER_ERROR:-1,
  COMPILE_SPJ_ERROR:'compile_spj_error',
  POST_ARGS_ERROR:'post_args_error',
  SUCCESS:0
}
exports.JUDGE = JUDGE

//把评测结果的中result转成sub中对应step,[废弃]
exports.JUDGE_RESULT_MAP_STEP = {
  [JUDGE.SUCCESS]           : 0,
  [JUDGE.COMPILE_ERROR]     : 1,
  [JUDGE.COMPILE_SPJ_ERROR] : 2,
  [JUDGE.OTHER_ERROR]       : 3
}

//把step转成对应的中文描述
exports.STEP_MAP_DESC = {
  "-1":"评测中",
  0:"评测正常",
  1:"编译失败",
  2:"SPJ编译失败",
  3:"其它错误"
}


//结果列表里的result的含义
exports.RESULT_LIST_MEAN = {
"-1" :"Wrong Answer"            ,
"0" :"Accept"                   ,
"1" :"Time Limit Exceeded"      ,
"2" :"Real Time Limit Exceeded" ,
"3" :"Memory Limit Exceeded"    ,
"4" :"Runtime Error"            ,
"5" :"System Error"             ,
"6" :"SPJ Runtime Error"        ,
"7" :"Judge Core Error"         ,   // judge.run 错误
"100" :"JUDGE Unkown Error"     ,   // 末知的末处理的错误
}

exports.RESULT_LIST_SHORT_MEAN = {
"-1" :"w",
"0" :"A",
"1" :"T",
"2" :"T",
"3" :"M",
"4" :"R",
"5" :"S",
"6" :"P"
}


exports.problemList_pageSize = 40
exports.subList_pageSize     = 50
exports.rankList_pageSize    = 50
exports.bbsList_pageSize     = 40
exports.JUDGING = "judging"
exports.CONTAIN_BESTSUB_COUNT = 10 //sub 里的bestsub的保留数量


exports.DEFAULT_CACHE_TIME = 10 // 10秒


//bbs的设置
exports.BBS_CONFIG = {
  tabs:['blow','problem'], //分类
  name:{
    'blow':'吹水',
    'problem':'题目讨论'
  }
}
