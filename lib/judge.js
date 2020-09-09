//连接评测机

const Client  = require("socket.io-client")

class JUDGE {
  constructor(addr,token){
    this.client = Client(`${addr}?token=${token}`,{time:3000}) //连接
    this.connected = false
    this.client.on('connect',()=>{
      console.log('==●﹏●== : 评测机连接成功! ==============')
      this.connected = true
    })
    this.client.on("reconnect_error",(error)=>{
      console.error("无法连接到评测机,请检查评测机,或连接参数")
      this.connected = false
    })
    //this.client.on("reconnect_timeout",function(){
      //console.log("time out")
    //})
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
    if(!this.connected) {
      throw(`没有连接到评测机`)
    }

    this.client.emit("judge",{
      uid,
      ...send_judge_data
    });
  }
}

module.exports = new JUDGE(CONFIG.JUDGE.addr,CONFIG.JUDGE.token)

