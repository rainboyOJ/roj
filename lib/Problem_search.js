const racci = require('racci')

class PROBLEM_SEARCH {
  constructor(){
    this.TIMEOUT_FLAG = null
  }

  //重建racci.Parser debounce
  Debouce_init(){ 
      clearTimeout(this.TIMEOUT_FLAG)
      this.TIMEOUT_FLAG = setTimeout(()=>{
        db.model['problem'].find({is_del:false})
          .select("title pid") //没有包含tag
          .then( doc => {
            let parse_doc = {}
            doc.map( ({_id,title,pid})=> parse_doc[pid+""] = {_id:_id.toString(),title,pid:pid+""})
            racci.Parser.import(parse_doc)
            racci.Parser.init("problem",["pid","title"],[20,10])
            debug('(..•˘_˘•..) ========> ')
          })
      },process.env.DEBUG === 'debug' ? 3*1000 : 10*60*1000) //debug 10 秒建立一次,10分钟重建一次
  }

  search(str){
    return racci.Search.search('problem',str,1,0)
  }
}

module.exports = new PROBLEM_SEARCH()
