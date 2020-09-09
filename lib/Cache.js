const Redis = require("ioredis");
const {DEFAULT_CACHE_TIME } = require("./DEFINE")

class CACHE  {
    constructor(redis_link) {
        this.redis = new Redis( redis_link || "redis://127.0.0.1");
        this.redis.on('connect',()=>{
          console.log("==●﹏●==: redis cache 连接成功！")
        })
    }

    async raw_get(key) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }

    // maxAge 秒
    async set(key,data,maxAge=DEFAULT_CACHE_TIME) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(key, JSON.stringify(data), 'EX', maxAge);
        } catch (e) {}
    }

    //async destroy(sid, ctx) {
        //return await this.redis.del(`SESSION:${sid}`);
    //}
    // (key,function: return Promise)
    async get(key,promise_func,maxAge){
      let ret = await this.raw_get(key)
      if( ret ) return ret
      ret = await promise_func()
      await this.set(key,ret,maxAge || DEFAULT_CACHE_TIME)
      return ret
    }
}

module.exports = new CACHE(CONFIG.REDIS);
