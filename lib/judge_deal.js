const client = require("./judge").client
const routerIns = require("koa-route-ex")
const {debug,table} = require('console')
const RouterIns = new routerIns()
const pathFn  = require('path')
const {loadYaml,maps_2_deal}= require('../utils')

let Function_deal_path = pathFn.join(pathFn.dirname(__filename),'Function_deal')



/* 加载 methods */
function load_methods(){
    Routers_methods = []
    maps_2_deal(Function_deal_path,[/^_/,/\.swp$/],(d)=> {
        let {rpath,full_path} = d
        //debug(rpath,full_path)
        Routers_methods.push({"路径":pathFn.relative(__project,full_path),"namespace":rpath,"名字":pathFn.basename(full_path).replace(".js","") })
        RouterIns.register(require(full_path),rpath)
    })
    return Routers_methods
}
console.log("============== 输出judge_deal的注册方法 ===============")
table(load_methods())

// 普通的提交
const problem_routes=RouterIns.create("/problem", [
  "problem.set_sub"
])
// 比赛的提交
//routerIns.create("/contest", middles)


client.on("judge_response",function(data){
  //console.log(data)
  let ctx = {...(JSON.parse(data.uid)),...data}
  //debug(ctx)
  problem_routes.routes()(ctx)


// 处理normal的route
  // 设置对应的sub
  // -分值 _.all ac,wa,..... 以第一个不ac的点为准
  // 设置对应的用户
  //  - 加分
  //  - 加通过
  // 设置对应的题目
  //  - 加通过 https://stackoverflow.com/questions/41444213/how-do-i-increment-a-number-value-in-mongoose/41444359
  //  - 加提交
  //  - 加best-post
// 处理比赛的route
})
