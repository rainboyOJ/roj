const router = require('koa-router')()
const captcha = require("../Function/utils/captcha")

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/captcha',captcha)
router.get('/register',async (ctx,next)=>{
  await ctx.render('register', {
    title: 'Hello Koa 2!'
  })
})

module.exports = router
