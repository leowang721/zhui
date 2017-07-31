/**
 * @file server/start as production after build
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')

const webpackConfig = require('./webpack.config.dev')

const app = new Koa()

app.use(koaStatic(path.resolve(__dirname, '../client/dist')))

app.listen(webpackConfig.devServer.port, () => {
  console.log(`Serving at: http://localhost:${webpackConfig.devServer.port}`)
})
