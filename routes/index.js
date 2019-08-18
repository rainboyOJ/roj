const {loadYaml,maps_2_deal}= require('../utils')
const pathFn  = require('path')
const RouterIns = require("koa-route-ex")

const routes_base = pathFn.join(__project , '/routes')
const methods_base = pathFn.join(__project,'/Function')

/* 加载 methods */
function load_methods(){
    maps_2_deal(methods_base,[/^_/],(d)=> {
        let {rpath,full_path} = d
        debug(rpath,full_path)
        RouterIns.register(require(full_path),rpath)
    })
}

module.exports =  function (koaApp){

    load_methods()


    const IndexYaml = loadYaml(routes_base + '/index.yaml')

    var routes  = []

    for(let O of IndexYaml){
        let {url,path,title} = O
        let middlewares = loadYaml(routes_base + path)
        debug('路由加载:',title, "url: ",url)
        for(let i = 0;i < middlewares.length;i++){
            let m = middlewares[i]
            if( m.name && m.name === 'title'){
                middlewares[i].argument = title
                break;
            }
        }
        routes.push( RouterIns.create(url,middlewares))
    }

    for( let route of routes){
        koaApp.use(route.routes())
    }
}
