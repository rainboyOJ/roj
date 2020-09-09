const {loadYaml,maps_2_deal}= require('../utils')
const pathFn  = require('path')
const routerIns = require("koa-route-ex")
const {debug,table} = require('console')
const RouterIns = new routerIns()

const routes_base = pathFn.join(__project , '/routes')
const methods_base = pathFn.join(__project,'/Function')

/* 加载 methods */
function load_methods(){
    Routers_methods = []
    maps_2_deal(methods_base,[/^_/,/\.swp$/],(d)=> {
        let {rpath,full_path} = d
        //debug(rpath,full_path)
        Routers_methods.push({"路径":pathFn.relative(__project,full_path),"namespace":rpath,"名字":pathFn.basename(full_path).replace(".js","") })
        RouterIns.register(require(full_path),rpath)
    })
    return Routers_methods
}

module.exports =  function (koaApp){

    let Routers_methods =  load_methods()
    debug("============= 路由实例中注册的方法:")
    table(Routers_methods)


    const IndexYaml = loadYaml(routes_base + '/index.yaml')

    var routes  = []
    var routes_table = []

    for(let O of IndexYaml){
        let {url,path,title,method} = O
        let middlewares = loadYaml(routes_base + path)
        for(let i = 0;i < middlewares.length;i++){
            let m = middlewares[i]
            if( m.name && m.name === 'title'){
                middlewares[i].argument = title
                break;
            }
        }
        routes.push( RouterIns.create(url,middlewares))
        if(method){
            routes[routes.length - 1].setMethod(method)
        }

        //debug('路由加载:',title, "url: ",url,"method", method ||  'GET')
        routes_table.push({'路由名':title, "url": url,"method": method ||  'GET'})
    }
    table(routes_table)

    for( let route of routes){
        koaApp.use(route.routes())
    }
}
