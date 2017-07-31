/**
 * @file server/router
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()

router.get('*', (ctx, next) => {
  ctx.body = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), {encoding: 'UTF-8'})
})

module.exports = router
