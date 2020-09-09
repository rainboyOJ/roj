//连接评测机

const Client  = require("socket.io-client")

class JUDGE {
  constructor(addr,token){
    this.client = Client(`${addr}?token=${token}`) //连接
    this.client.on('connect',()=>{
      console.log('==●﹏●== : judgeserver connected! ==============')
    })
  }

  /* 
   * desc: 发送评测数据
   * uid uique short string,maybe JSON.stringily
   *{
   *     code:"",
   *     id: "a+b",
   *     lang: "cpp",
   *     memory: 128, //mb
   *     time: 1000 ,  //ms
   *     stack: 128, //mb
   *     spj: "default",
   *     auto_io:true,//是否使用 noi 手动读入数据
   *     file_in:"in",
   *     file_out:"out"
   *}
   * */
  judge = function (uid,send_judge_data) {
    this.client.emit("judge",{
      uid,
      ...send_judge_data
    });
  }
}

module.exports = new JUDGE(CONFIG.JUDGE.addr,CONFIG.JUDGE.token)

