/**
 * @file server/start
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

const path = require('path')
const Koa = require('koa')
const koaConvert = require('koa-convert')
const koaMount = require('koa-mount')
const koaStatic = require('koa-static')
const koaViews = require('koa-views')
const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')

const webpackConfig = require('./webpack.config.dev')
const compiler = webpack(webpackConfig)
const router = require('./router')

const app = new Koa()

// api文档 直接先走 static
app.use(koaMount('/api', koaStatic(path.resolve(__dirname, '../../docs/api'))))

// resources
app.use(koaMount('/resource', koaStatic(path.resolve(__dirname, '../client/src/resource'))))

// server render 的模板输出
app.use(koaViews(path.join(__dirname, './views'), {
  map: {
    html: 'swig'
    // md: 'hogan'
  }
}))

app.use(koaConvert(devMiddleware(compiler, webpackConfig.devServer)))
app.use(koaConvert(hotMiddleware(compiler)))

app.use(router.routes())
app.use(router.allowedMethods())

// app.use(koaStatic(path.resolve(__dirname, '../client')))

app.listen(webpackConfig.devServer.port, () => {
  console.log(`Serving at: http://localhost:${webpackConfig.devServer.port}`)
})
